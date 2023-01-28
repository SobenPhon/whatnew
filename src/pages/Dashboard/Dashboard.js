import { DashboardStyle } from "./Dashboard.styled"
import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { DashTopbar } from "../../components/DashboardCom/DashTopbar.js/DashTopbar"

import { MdDashboard } from 'react-icons/md'
import { IoMdListBox } from 'react-icons/io'
import { BiCategory } from 'react-icons/bi'
import { RiFileUserFill } from 'react-icons/ri'
// import { AiFillSetting } from 'react-icons/ai'
import { RiImage2Fill } from 'react-icons/ri'

const Dashboard = () => {

  return (
    <DashboardStyle>
      <DashTopbar />

      <div className="dash-wrapper">
        <aside className="left-sidebar">
          <ul className="menu-list">
            <li className="menu-list-item"><NavLink end to='/dashboard'><MdDashboard /> ស្ថិតិ</NavLink></li>
            <li className="menu-list-item"><NavLink to='post'><IoMdListBox /> អត្ថបទ</NavLink></li>
            <li className="menu-list-item"><NavLink to='media'><RiImage2Fill /> រូបភាព</NavLink></li>
            <li className="menu-list-item"><NavLink to='category'><BiCategory /> ប្រភេទអត្ថបទ</NavLink></li>
            <li className="menu-list-item"><NavLink to='user'><RiFileUserFill /> អ្នកប្រើប្រាស់</NavLink></li>
          </ul>
        </aside>

        <main className="content-area">
          {/* render what current route is */}
          <Outlet />
        </main>
      </div>
    </DashboardStyle>
  )
}

export default Dashboard