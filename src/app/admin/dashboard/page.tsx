import { getCategoryData } from "@/actions/categories";
import PageComponent from "./page-component"
import { getMonthlyOrders } from '@/actions/orders';
import { getLatestUsers } from "@/actions/auth";


const AdminDashboard = async () => {

  const monthlyOrders= await getMonthlyOrders()
  const categoryData=await getCategoryData()
  const latestUsers = (await getLatestUsers()).map(user => ({
    ...user,
    date: user.date || new Date().toISOString()
  }))

  return (
     <PageComponent
     latestUsers={latestUsers}
   monthlyOrders={monthlyOrders}
    categoryData={categoryData}
    />
  )
}

export default AdminDashboard