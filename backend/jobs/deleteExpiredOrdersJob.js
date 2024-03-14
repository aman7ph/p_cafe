import cron from "node-cron";
import Order from "../models/orderModel.js";

function parseTimeString(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export const deleteExpiredOrdersJob = cron.schedule(
  "* * * * *",
  async () => {
    try {
      const orders = await Order.find();

      orders.forEach(async (order) => {
        const arrivalTimePlus20Min = new Date(
          parseTimeString(order.ariveTime).getTime() + 2 * 60000
        );
        const currentTime = new Date();

        if (currentTime >= arrivalTimePlus20Min && !order.isPaid) {
          await Order.deleteOne({ _id: order._id });
        }
      });
    } catch (error) {
      console.error("Error checking orders:", error);
    }
  },
  {
    scheduled: false,
  }
);
