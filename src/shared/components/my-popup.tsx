import { Popover } from "@mui/material";

import React from 'react'
import useAppContext from "../hooks/app-context";

export const MyPopup = () => {
  const [context, dispatch] = useAppContext()
  const handlePopoverClose = () => {
    dispatch({
      action: "SET_POPUP_CHILD", payload: {
        popupChild: <></>
      }
    })
    dispatch({
      action: "SET_POPUP_STATE", payload: {
        popupState: false
      }
    })
  }
  return (
    <Popover
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      onClose={handlePopoverClose}
      open={context.popupState!}
    >
      {context.popupChild}
    </Popover>
  )
}