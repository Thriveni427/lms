import combineStyles from './combineStyles';
import buttons from './buttons';
import textFields from './textFields';
import loginForm from './loginForm';
import simpleTabs from './simpleTabs';
import { Nav } from './nav';
import { scrollbars } from './scrollbars';
import { CourseStyles } from './CourseStyles';
import dialog from './dialog';

const combinedStyles = combineStyles(buttons, textFields, loginForm, simpleTabs, Nav, scrollbars, CourseStyles, dialog);
export default combinedStyles;