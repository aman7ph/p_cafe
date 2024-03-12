import React from "react"

import SplitButton from "../../components/SplitButton"

const Dashbord = () => {
  const productActions = [
    { link: "/admin/productlist", name: "Products list" },
    { link: "/admin/product/create", name: "Create Product" },
  ]
  const orderActions = [{ link: "/admin/orderlist", name: "Orders list" }]
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

  return (
    <div className="d-flex">
      <div className="w-25">
        <h1>Dashbord</h1>
        <div className="d-flex flex-column ">
          <SplitButton title="Product" actions={productActions} />
          <SplitButton title="Order" actions={orderActions} />
          <SplitButton title="Materials" actions={materialActions} />
          <SplitButton title="Promotion" actions={promotionActions} />
          <SplitButton title="Feedback" actions={feedbackActions} />
        </div>
      </div>
      <div>
        <p>
          You can now view frontend in the browser. Local: http://localhost:3000
          On Your Network: http://192.168.8.104:3000 Note that the development
          build is not optimized. To create a production build, use npm run
          build.
        </p>
      </div>
    </div>
  )
}

export default Dashbord
