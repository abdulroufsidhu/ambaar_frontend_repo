import { Chip, Collapse, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material'
import React, { useState } from 'react'
import { User } from '../../shared/models/user'
import { Business, IBusiness } from '../../shared/models/business'
import { Employee } from '../../shared/models/employee'
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Branch, IBranch } from '../../shared/models/branch'

export const ProfileView = () => {

  const [businessCollapseState, setBusinessCollapseState] = useState(false)
  const [jobCollapseState, setJobCollapseState] = useState(false)
  const [branches, setBranches] = useState<IBranch[] | undefined>([])

  const handleBusinessCollapsableClick = () => {
    setBusinessCollapseState(prev => !prev)
  }
  const handleJobCollapsableClick = () => {
    setJobCollapseState(prev => !prev)
  }

  const handleBusinessClick = (business: IBusiness | undefined) => {
    if (!business || !business._id) { return }
    Branch.list(business._id ?? "").then(l => {
      if (l) {
        setBranches(l)
      }
    }).catch(e => console.error(e))
  }

  return (
    <Stack direction="column" >
      <List>
        <ListItem>
          <ListItemText
            primary={`Name: ${User.getInstance().person?.name ?? "Un Named"}`}
            secondary={`eMail: ${User.getInstance().person?.email ?? "Un Known"}`}
          />
        </ListItem>
        {/* <ListItemButton onClick={handleBusinessCollapsableClick} >
          <ListItemIcon>
            {businessCollapseState ? <ArrowUpwardOutlined /> : <ArrowDownwardOutlined />}
          </ListItemIcon>
          <ListItemText primary={<> Total Business <Chip label={Business.getLoadedList().length} /> </>} />
        </ListItemButton>
        < Collapse in={businessCollapseState} unmountOnExit>
          <List component="div" disablePadding>
            {
              Business.getLoadedList()?.map(business => (<>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleBusinessClick(business)} >
                  <ListItemText
                    primary={`${business?.name ?? "Un Named"}`}
                    secondary={`${business?.location ?? "Un Known"}\n${business?.email ?? "Un Known"}`} />
                </ListItemButton>
              </>))
            }
          </List>
        </Collapse> */}
        <ListItemButton onClick={handleJobCollapsableClick} >
          <ListItemIcon>
            {businessCollapseState ? <ArrowUpwardOutlined /> : <ArrowDownwardOutlined />}
          </ListItemIcon>
          <ListItemText primary={<> Total Jobs <Chip label={User.getInstance().jobs?.length ?? 0} /> </>} />
        </ListItemButton>
        < Collapse in={jobCollapseState} unmountOnExit>
          <List component="div" disablePadding>
            {
              User.getInstance().jobs?.map(job => (<>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleBusinessClick(job)} >
                  <ListItemText
                    primary={`${job?.role ?? "Un Named"}`}
                    secondary={(
                      <pre>{`
                        ${job?.branch?.location ?? "Un Known"}
                        \n${job?.branch?.business?.name ?? "Un Known"}
                        \n${job?.status ?? "active"}
                        `.trim()}
                      </pre>)} />
                </ListItemButton>
                <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }} >
                  <Divider sx={{ width: "60%" }} />
                </div>
              </>))
            }
          </List>
        </Collapse>
      </List>
    </Stack>
  )
}
