
export const styles = {
    
    glassMorphism: {
        background: "rgba(255, 255, 255, 0.25)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: "10px"
    },
    myMakeStyles: (theme) => {
        return {
            paper: {
                marginTop: theme.spacing(8),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            },
            avatar: {
                margin: theme.spacing(1),
            },
            form: {
                width: "100%", // Fix IE 11 issue.
                marginTop: theme.spacing(1),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
        }
    }
}