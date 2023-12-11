import { Drawer } from '@mui/material'
import React, { useState } from 'react'

const SmallScreen = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div>
         <Drawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            anchor="right"
          ></Drawer>
    </div>
  )
}

export default SmallScreen