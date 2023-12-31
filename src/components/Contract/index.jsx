import React, { useEffect, useState } from "react";
import aboutImg from "/contract-img.jpg";
import InputBlock from "../Shared/InputBlock";
import { useDispatch } from "react-redux";

function Contract() {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState({
    name: "",
    email: "",
    phonenumber: "",
    message: "",
  });
  const phonenumberCheck = messages.phonenumber

  const handleChange = (e) => {
    setMessages({ ...messages, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessageData(messages);
  };

  const sendMessageData = async (messages) => {
    try {
      const response = await fetch(
        "https://apiuser-zavj.onrender.com/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messages),
        }
      );

      if (response.ok) {
        alert("Đã gửi tin nhắn thành công");
        setMessages({
          name: "",
          email: "",
          phonenumber: "",
          message: "",
        });
      } else {
        alert("Vui lòng gửi lại tin nhắn");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <section id="contract" className="mb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="wrap-contract-img d-flex justify-content-center align-items-center rounded">
              <img
                src={aboutImg}
                className="contract-img rounded"
                alt="about img"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="detail-box">
              <div className="heading_container">
                <h2>Để lại lời nhắn cho chúng tôi</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <InputBlock
                  isLabel
                  isTextDark
                  labelContent="Tên bạn là gì?"
                  idInput="name"
                  valueInput={messages.name}
                  handleChange={handleChange}
                ></InputBlock>
                <InputBlock
                  isTextDark
                  isLabel
                  labelContent="Email:"
                  typeInput="email"
                  idInput="email"
                  valueInput={messages.email}
                  handleChange={handleChange}
                ></InputBlock>
                <InputBlock
                  isTextDark
                  isLabel
                  labelContent="Số điện thoại:"
                  typeInput="number"
                  idInput="phonenumber"
                  valueInput={messages.phonenumber}
                  handleChange={handleChange}
                  checkPhoneNumber
                ></InputBlock>
                <InputBlock
                  isTextDark
                  isLabel
                  labelContent="Lời nhắn bạn muốn để lại:"
                  idInput="message"
                  valueInput={messages.message}
                  handleChange={handleChange}
                ></InputBlock>
                <button className="contract-btn" type="submit">
                  Để lại lời nhắn cho chúng tôi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contract;
