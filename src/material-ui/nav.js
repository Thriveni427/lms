
export const Nav = theme => ({
    navpaper: {
        boxShadow: 'none',
        borderRadius: 0,
        backgroundColor: 'transparent',
        marginTop: 53
    },
    MenuList: {
        padding: 0,
        margin: 0
    },
    menuItem: {
        color: theme.palette.common.white,
        paddingTop: 15,
        paddingBottom: 15,
        '& $primary, & $navicon, & span': {
            color: '#aaadb1'
        },
        '&:hover, &:focus': {
            //backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            '& $primary, & $navicon, & span': {
                color: theme.palette.common.white,
            },
        },
    },
    navicon: {
        marginRight: 5,
        fontSize: 18,
    },
    navcollapse: {
        backgroundColor: '#0d141f'
    },
    nested: {
        '& $primary, & $navicon, & span': {
            color: theme.palette.common.white,
        },
    },
    nestedItems: {
        paddingLeft: "10px!important",
        '&:first-child': {
            paddingLeft: "10px!important",
        },
    },
    nestedItemsBig: {
        fontSize: 100,
        '& span':{
            fontSize: 20,
            backgroundColor: '#c0c0c0',
        },
        paddingLeft: "10px!important",
        '&:first-child': {
            paddingLeft: "10px!important",
        },
    },

    lightdivider: {
        backgroundColor: '#0d141f',
        marginTop: 10
    }
})
