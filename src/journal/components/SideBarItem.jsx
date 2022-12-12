import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { useMemo } from "react"

export const SideBarItem = ({ title = '', body= '', id }) => {
    
    const newTitle = useMemo( () => {

        // cortar el titulo si es muy largo
        return title.length > 17
            ? title.substring( 0, 17 ) + '...'
            : title;

    }, [ title ] )

    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container direction='column'>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
