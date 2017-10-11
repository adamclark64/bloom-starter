import React from 'react';
import Transition from 'react-transition-group/Transition'

import 'styles/components/alerts.scss';

const Alert = (props) => {
  const { currentAlert } = props;
  return (
    <div className={ `alert__background ${ props.hidden ? 'hidden' : '' }` }>
      <Transition in={!!currentAlert} timeout={0}>
        {(status) =>
          <div className={ `alert alert--${ currentAlert ? currentAlert.style : '' } decend-${status}` }>
            <div className={ `alert__icon icons-${ currentAlert ? currentAlert.style : '' }` }></div>
            <div className='alert__text'>{ currentAlert ? currentAlert.message : '' }</div>
          </div>
        }
      </Transition>
    </div>
  )
}

export default Alert;