import React from 'react';
import { Tooltip } from 'antd';
import mask from '../icon/mask.svg';
import glasses from '../icon/glasses.svg';
import tshirt from '../icon/tshirt.svg';
import shower from '../icon/shower.svg';
import window from '../icon/window.svg';
import bisicle from '../icon/bisicle.svg';
import tree from '../icon/club-svgrepo-com.svg'

const GridMapTable = () => {
  const recommendations = [
    { icon: mask, text: "Маски настоятельно рекомендуются" },
    { icon: glasses, text: "Настоятельно рекомендуется солнцезащитные очки" },
    { icon: tshirt, text: "Не носите шерстяную одежду на открытом воздухе" },
    { icon: shower, text: "Рекомендуется принять душ после выхода на улицу" },
    { icon: window, text: "Рекомендуется закрыть окна и двери и включить очиститель воздуха" },
    { icon: bisicle, text: "Избегайте занятий на свежем воздухе" }
  ];

  return (
    <>
                <Tooltip title={recommendations.map((rec) => (
                  <div>
                    <img src={rec.icon} alt="Иконка рекомендации" style={{ width: '20px', marginRight: '8px' }} />
                    <span>{rec.text}</span>
                  </div>
                ))}>
                 <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0' }}>
  <img src={tree} alt="Tree Icon" style={{ width: '24px', height: '24px' }} />
</button>
                </Tooltip>
    
    </>
  );
};

export default GridMapTable;