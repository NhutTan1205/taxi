import React, { useEffect, useState } from "react";
import "../../../css/booking.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputBlock from "../../Shared/InputBlock";

function RegisPartner() {
  const dispatch = useDispatch();
  let dayInput = [];
  let monthInput = [];
  let yearInput = [];
  const [regisDriver, setRegisDriver] = useState({
    name: "",
    dob: "",
    cmnd: "",
    phone: "",
    address: "",
  });
  const [birthDay, setBirthDay] = useState();
  const [birthMonth, setBirthMonth] = useState();
  const [birthYear, setBirthYear] = useState();
  const [birthdayOfDriver, setBirthdayOfDriver] = useState()
  const [fullNameInput, setfullNameInput] = useState()
  const [idNumberInput, setIdNumberInput] = useState()
  const [phoneNumberInput, setPhoneNumberInput] = useState()
  const [addressInput, setAddressInput] = useState()


  useEffect(() => {
    setRegisDriver({
      name: fullNameInput,
      dob: birthdayOfDriver,
      cmnd: idNumberInput,
      phone: phoneNumberInput,
      address: addressInput,
    })
  }, [fullNameInput, birthdayOfDriver, phoneNumberInput, idNumberInput, addressInput])

  // Lấy họ và tên 
  function getFullName(e){
    setfullNameInput(e.target.value)
  }
  // Lây số CMND
  function getIdNumber(e){
    setIdNumberInput(e.target.value)
  }
  // Lấy số điện thoại
  function getPhoneNumber(e){
    setPhoneNumberInput(e.target.value)
  }
  // Lấy địa chỉ
  function getAddress(e){
    setAddressInput(e.target.value)
  }

  // Xử lí ngày tháng năm sinh
  function getBirthDay(e) {
    setBirthDay(e.target.value.toString());
  }
  function getBirthMonth(e) {
    setBirthMonth(e.target.value.toString());
  }
  function getBirthYear(e) {
    setBirthYear(e.target.value.toString());
  }
  useEffect(() => {
    setBirthdayOfDriver(birthDay + '/' + birthMonth + '/' + birthYear)
  }, [birthDay, birthMonth, birthYear])
  


  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRegisDriverData(regisDriver)
  };

  for (let i = 1; i <= 31; i++) {
    dayInput.push(<option key={i} value={i}>{i}</option>);
  }
  for (let i = 1; i <= 12; i++) {
    monthInput.push(<option key={i} value={i}>{i}</option>);
  }
  for (let i = 1950; i <= 2023; i++) {
    yearInput.push(<option key={i} value={i}>{i}</option>);
  }

  const sendRegisDriverData = async (regisDriver) => {
    try {
      const response = await fetch(
        "https://apiuser-zavj.onrender.com/regisDriver",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(regisDriver),
        }
      );

      if (response.ok) {
        alert("Đặt xe thành công");
      } else {
        alert("Vui lòng đặt xe lại");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="booking">
      <div className="div-booking mx-auto">
        <h2 className="text-white">Đăng kí thành tài xế</h2>
        <form onSubmit={handleSubmit}>
          <InputBlock
            labelContent="Họ và tên"
            idInput="FullName"
            // valueInput={regisDriver.FullName}
            handleChange={getFullName}
          ></InputBlock>
          <hr className="elem-group-hr" />
          <InputBlock
            labelContent="Số CMND/CCCD"
            typeInput="number"
            idInput="IDPerson"
            // valueInput={regisDriver.IDPerson}
            handleChange={getIdNumber}
          ></InputBlock>
          <InputBlock
            labelContent="Số điện thoại"
            typeInput="number"
            idInput="phonenumber"
            // valueInput={regisDriver.phonenumber}
            handleChange={getPhoneNumber}
          ></InputBlock>
          <div className="elem-group">
            <label className="elem-group-label d-block text-white">
              Ngày tháng năm sinh
            </label>
            <select
              id="dayOfBirth"
              name="dayOfBirth"
              required
              onChange={getBirthDay}
              className="rounded col-4 py-2"
            >
              {dayInput}
            </select>
            <select
              id="monthOfBirth"
              name="monthOfBirth"
              required
              onChange={getBirthMonth}
              className="rounded col-4 py-2"
            >
              {monthInput}
            </select>
            <select
              id="yearOfBirth"
              name="yearOfBirth"
              required
              onChange={getBirthYear}
              className="rounded col-4 py-2"
            >
              {yearInput}
            </select>
          </div>
          <hr className="elem-group-hr" />
          <InputBlock
            labelContent="Địa chỉ"
            idInput="address"
            // valueInput={regisDriver.address}
            handleChange={getAddress}
          ></InputBlock>
          <button className="btn-submit text-white" type="submit">
            Đặt xe
          </button>
          <button className="btn-submit text-white mt-4" type="submit">
            <Link to="/">Quay lại trang chủ</Link>
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegisPartner;