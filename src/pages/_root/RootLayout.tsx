import { AppSidebar } from "@/components/blocks/AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />

        <main className="flex flex-col">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  )
}

export default RootLayout