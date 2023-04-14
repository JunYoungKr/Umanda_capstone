import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./SignUpPage.module.scss";
import { useNavigate } from "react-router";

const SignUpMain = () => {
  const [responseData, setResponseData] = useState(null);

  let [isIdClicked, setisIdClicked] = useState(false);
  let [isPassClicked, setisPassClicked] = useState(false);
  let [isPassClicked_1, setisPassClicked_1] = useState(false);
  let [isNameClicked, setisNameClicked] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(0);
  const [gender, setGender] = useState("");

  const [errors, setErrors] = useState({});

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePassword1Change = (e) => {
    setPassword1(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBirthChange = (e) => {
    setBirthdate(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const navigate = useNavigate();

  /* 유효성 검사 */
  const handleRegister = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://ec2-13-125-237-47.ap-northeast-2.compute.amazonaws.com:8080/register",
        {
          username: username,
          password: password,
          password1: password1,
          name: name,
          birthdate: birthdate,
          gender: gender,
        }
      )
      .then((response) => {
        console.log(response);
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("회원가입에 실패했습니다.");
      });
  };

  return (
    <div className={styles.Container}>
      <h1 className={styles.register}>회원가입</h1>
      <div className={styles.Container2}>
        <div>
          <p className={styles.id}>아이디</p>
          <input
            onFocus={() => {
              setisIdClicked(true);
            }}
            onBlur={() => {
              setisIdClicked(false);
            }}
            className={styles.inputId}
            type="string"
            placeholder={isIdClicked === true ? "" : "아이디 입력 (6 ~ 20자)"}
            value={username}
            onChange={handleUsernameChange}
          />
          {/* <button
              className={styles.duplicateButton}
              onClick={handleDuplicateCheck}
            >
              중복 확인
            </button>
            {isDuplicate && (
              <p className={styles.duplicate}>이미 사용 중인 아이디입니다.</p>
            )} */}
        </div>
        <div>
          <p className={styles.id}>패스워드</p>
          <input
            onFocus={() => {
              setisPassClicked(true);
            }}
            onBlur={() => {
              setisPassClicked(false);
            }}
            className={styles.inputId}
            type="password"
            placeholder={
              isPassClicked === true
                ? ""
                : "패스워드 입력 (문자, 숫자, 특수문자 포함 8 ~ 20자)"
            }
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <p className={styles.id}>패스워드 확인</p>
          <input
            onFocus={() => {
              setisPassClicked_1(true);
            }}
            onBlur={() => {
              setisPassClicked_1(false);
            }}
            className={styles.inputId}
            type="password"
            placeholder={
              isPassClicked_1 === true
                ? ""
                : "패스워드 입력 (문자, 숫자, 특수문자 포함 8 ~ 20자)"
            }
            value={password1}
            onChange={handlePassword1Change}
          />
        </div>
        <div>
          <p className={styles.id}>이름</p>
          <input
            onFocus={() => {
              setisNameClicked(true);
            }}
            onBlur={() => {
              setisNameClicked(false);
            }}
            className={styles.inputId}
            type="string"
            placeholder={isNameClicked === true ? "" : "이름을 입력해주세요"}
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <p className={styles.id}>생년월일</p>
          <input
            className={styles.Birth}
            type="number"
            placeholder="연도"
            value={birthdate}
            onChange={handleBirthChange}
          />
        </div>
        <div className={styles.label}>
          <p>성별</p>
          <label className={styles.maleLabel}>
            <input
              type="radio"
              name="gender"
              value="MAN"
              checked={gender === "MAN"}
              onChange={handleGenderChange}
            />
            남성
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="WOMEN"
              checked={gender === "WOMEN"}
              onChange={handleGenderChange}
            />
            여성
          </label>
        </div>
      </div>
      <div>
        <button onClick={handleRegister} className={styles.registerButton}>
          회원가입
        </button>
        {responseData && <div>{responseData}</div>}
      </div>
    </div>
  );
};

export default SignUpMain;