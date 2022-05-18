import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




class CustomizedBreadcrumbs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  render() {
    const chemins = this.props.chemin;
    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
      const backgroundColor =
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[800];
      return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
          backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
          boxShadow: theme.shadows[1],
          backgroundColor: emphasize(backgroundColor, 0.12),
        },
      };
    })
    return (
      <div role="presentation" onClick={this.handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            component="a"
            href="#"
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          />
          {chemins.map(item => (
            <StyledBreadcrumb component="a" href="#" label={item} />
          ))}

        </Breadcrumbs>
      </div>
    );
  }
}
export default CustomizedBreadcrumbs;
