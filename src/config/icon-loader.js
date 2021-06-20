import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faTasks } from '@fortawesome/free-solid-svg-icons/faTasks';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faThList } from '@fortawesome/free-solid-svg-icons/faThList';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { faWrench } from '@fortawesome/free-solid-svg-icons/faWrench';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faChartBar } from '@fortawesome/free-solid-svg-icons/faChartBar';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/faFolderOpen';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';

import { library } from '@fortawesome/fontawesome-svg-core';

export const loadIcons = () => {
  library.add(
    faTrash,
    faArrowLeft,
    faArrowRight,
    faSave,
    faPlus,
    faPencilAlt,
    faUser,
    faList,
    faTasks,
    faLock,
    faSignInAlt,
    faSignOutAlt,
    faThList,
    faUserPlus,
    faWrench,
    faHome,
    faSearch,
    faChartBar,
    faCogs,
    faFolderOpen,
    faFolder
  );
};
