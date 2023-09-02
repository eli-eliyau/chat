import { getDateNow, styles } from "./Message";
import { Box, Grid, Link, Typography } from "@mui/material";
import SimCardDownloadTwoToneIcon from "@mui/icons-material/SimCardDownloadTwoTone";

const FileDownloaded = (props: {
  file: {
    name: string;
    url: string;
    date: string;
  };
  right?: string;
  left?: string;
}) => {
  let style = {};

  props.left ? (style = styles.left) : (style = styles.right);

  return (
    <Grid xs={9} sm={7} md={3} sx={style}>
      <Link href={props.file.url} download={props.file.name}>
        <SimCardDownloadTwoToneIcon
          color="action"
          fontSize="large"
          sx={{ display: "block", margin: "0 auto", pt: 1 }}
        />
      </Link>
      <Typography variant="body2">{props.file?.name}</Typography>
      <Box sx={{ pt: 1 }}>{getDateNow(props.file.date)}</Box>
    </Grid>
  );
};

export default FileDownloaded;
