import Link from 'next/link'

import Logo from 'components/logo'
import Button from 'components/button'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@material-ui/core/List'
import MenuItem from '@material-ui/core/ListItem'
import NotesIcon from '@mui/icons-material/Notes'
import IconButton from '@mui/material/IconButton'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            width: '100%',
            display: 'flex',
            gap: '3rem',

            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },

        link: {
            fontWeight: theme.typography.body1.fontWeight,
            fontSize: theme.typography.body1.fontSize,
            color: `${theme.palette.grey[200]}`,
            textTransform: 'capitalize',
            transition: 'all 0.2s',
            textDecoration: 'none',

            '&:hover': {
                color: theme.palette.common.black,
                background: 'none',
            },
        },

        button: {
            display: 'none',
            [theme.breakpoints.down('sm')]: {
                display: 'inline-block',
            },
        },

        icon: {
            color: theme.palette.grey[200],
        },
    }
})

interface Props {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    links: any[]
}

const Header: React.FC<Props> = ({ onClick, links }) => {
    const classes = useStyles()

    const headerItems = links.map(
        (link: { text: string; link: string }, index) => {
            return (
                <MenuItem
                    style={{
                        width: 'max-content',
                        flexGrow: index === 2 ? 1 : 0,
                    }}
                    disableGutters
                    key={link.text}
                >
                    <Link href={link.link}>
                        <a className={classes.link}>{link.text}</a>
                    </Link>
                </MenuItem>
            )
        }
    )

    return (
        <AppBar
            position="static"
            sx={{
                bgcolor: 'white',
                padding: '0.75rem 0',
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link href="/">
                    <a>
                        <Logo />
                    </a>
                </Link>

                <List className={classes.root}>
                    {headerItems}
                    <MenuItem style={{ width: 'max-content' }} disableGutters>
                        <Button>Sign up</Button>
                    </MenuItem>
                </List>

                <div className={classes.button}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onClick}
                    >
                        <NotesIcon fontSize="large" className={classes.icon} />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header
