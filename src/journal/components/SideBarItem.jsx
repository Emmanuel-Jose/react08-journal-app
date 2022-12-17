import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { useMemo } from "react"
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ title = '', body= '', id, date, imageUrls = [] }) => {

    const disptach = useDispatch();
    
    const newTitle = useMemo( () => {

        // cortar el titulo si es muy largo
        return title.length > 17
            ? title.substring( 0, 17 ) + '...'
            : title;

    }, [ title ] )

    const onActivateNote = () => {
        
        disptach( setActiveNote({ title, body, id, date, imageUrls }) )
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={ onActivateNote }>
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
