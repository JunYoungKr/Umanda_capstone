import React, { useState } from "react";
import axios from "axios";
import styles from "./AiTravelCountry.module.scss";
import Tab from "./Tab";

const AiTravelCountry = () => {
  const [selectedFirst, setSelectedFirst] = useState("동아시아");
  const [selectedSecond, setSelectedSecond] = useState("한국");
  const [selectedThird, setSelectedThird] = useState([]);

  const firstColumn = [
    "동아시아",
    "유럽",
    "서남아시아",
    "아프리카",
    "동남아시아",
    "아메리카",
    "오세아니아",
  ];

  const secondColumn = {
    유럽: ["영국", "프랑스", "스페인", "스위스", "이탈리아", "독일"],
    동아시아: ["한국", "일본", "중국", "몽골", "대만", "마카오"],
  };

  const thirdColumn = {
    영국: [
      { name: "런던", checked: false },
      { name: "맨체스터", checked: false },
    ],
    프랑스: [
      { name: "파리", checked: false },
      { name: "마르세유", checked: false },
    ],
    스페인: [
      { name: "마드리드", checked: false },
      { name: "바르셀로나", checked: false },
    ],
    스위스: [
      { name: "취리히", checked: false },
      { name: "베른", checked: false },
    ],
    이탈리아: [
      { name: "로마", checked: false },
      { name: "밀라노", checked: false },
    ],
    독일: [
      { name: "베를린", checked: false },
      { name: "뮌헨", checked: false },
    ],
  };

  const handleFirstClick = (item) => {
    setSelectedFirst(item);
    setSelectedSecond("");
    setSelectedThird([]);
  };

  const handleSecondClick = (item) => {
    setSelectedSecond(item);
    setSelectedThird([]);
  };

  const handleThirdClick = (item) => {
    const updatedSelectedThird = [...selectedThird];
    const index = selectedThird.findIndex(
      (selectedItem) => selectedItem.name === item.name
    );

    if (index > -1) {
      updatedSelectedThird.splice(index, 1);
    } else {
      updatedSelectedThird.push(item);
    }

    setSelectedThird(updatedSelectedThird);
  };

  // Add or remove other checked items from the selectedThird array

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        {firstColumn.map((item) => (
          <button
            key={item}
            onClick={() => handleFirstClick(item)}
            className={selectedFirst === item ? styles.active : ""}
          >
            {item}
          </button>
        ))}
      </div>
      {selectedFirst && (
        <div className={styles.column}>
          {secondColumn[selectedFirst] &&
            secondColumn[selectedFirst].map((item) => (
              <button
                key={item}
                onClick={() => handleSecondClick(item)}
                className={selectedSecond === item ? styles.active : ""}
              >
                {item}
              </button>
            ))}
        </div>
      )}
      {selectedSecond && (
        <div className={styles.column}>
          {thirdColumn[selectedSecond] &&
            thirdColumn[selectedSecond].map((item) => (
              <button
                key={item.name}
                onClick={() => handleThirdClick(item)}
                className={
                  (selectedThird &&
                    selectedThird.findIndex(
                      (selectedItem) => selectedItem.name === item.name
                    ) > -1) ||
                  item.checked
                    ? styles.active
                    : ""
                }
              >
                {item.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
export default AiTravelCountry;