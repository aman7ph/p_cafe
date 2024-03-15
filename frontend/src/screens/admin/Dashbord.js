import React from "react"

import SplitButton from "../../components/SplitButton"

const Dashbord = () => {
  const productActions = [
    { link: "/admin/productlist", name: "Products list" },
    { link: "/admin/product/create", name: "Create Product" },
  ]
  const orderActions = [
    { link: "/admin/orderlist", name: "Orders list" },
    { link: "/admin/paiedorderlist", name: "Paied Orders" },
  ]
  const promotionActions = [
    { link: "/admin/promotionlist", name: "Promotions lists" },
    { link: "/admin/promotion/create", name: "Create Promotion" },
  ]
  const materialActions = [
    { link: "/admin/materiallist", name: "Materials list" },
    { link: "/admin/material/create", name: "Create Material" },
  ]
  const feedbackActions = [
    { link: "/admin/feedbacklist", name: "Feedback list" },
  ]
  const reportActions = [{ link: "/admin/reports", name: "Reports" }]
  return (
    <div className="d-flex">
      <div className="w-25">
        <div className="d-flex flex-column ">
          <SplitButton title="Product" actions={productActions} />
          <SplitButton title="Order" actions={orderActions} />
          <SplitButton title="Materials" actions={materialActions} />
          <SplitButton title="Promotion" actions={promotionActions} />
          <SplitButton title="Feedback" actions={feedbackActions} />
          <SplitButton title="Reports" actions={reportActions} />
        </div>
      </div>
      <div className="mx-5">
        <h1>Dashbord</h1>
      </div>
    </div>
  )
}

export default Dashbord
