import React, { useLayoutEffect, useState } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import lozad from "lozad";

const Login = () => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [input, setInput] = useState({});
   const [errors, setErrors] = useState({});

   const submit = (e) => {
      e.preventDefault();

      let formData = {};
      Object.keys(input).map((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      h.post("/login/submit", formData)
         .then((res) => {
            const { data, status } = res;
            setErrors(data.errors);

            if (data.status) {
               open("/admin/pendaftar", "_parent");
            } else {
               h.notification(data.status, data.msg_response, status);
            }
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsSubmit(false);
         });
   };

   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   return (
      <Container fluid className="p-0">
         <Row className="no-gutters">
            <Col lg={6} sm={12}>
               <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                  <div className="w-100">
                     <Row className="justify-content-center">
                        <Col lg={9} sm={12}>
                           <div>
                              <div className="text-center">
                                 <div>
                                    <a href="/" className="logo">
                                       <img
                                          className="lozad"
                                          data-src="https://abjgyjvqwq.cloudimg.io/v7/https://uin.ar-raniry.ac.id/assets/img/7b186572c6e368277455f8954d2ffe2d1.png"
                                       />
                                    </a>
                                 </div>
                                 <h4 className="font-size-18 mt-4">Selamat datang di</h4>
                                 <p className="text-muted">Beasiswa Kartu Indonesia Pintar</p>
                              </div>
                              <div className="p-2 mt-5">
                                 <Form className="form-horizontal" onSubmit={isSubmit ? null : submit}>
                                    <div className="auth-form-group-custom mb-4 form-group">
                                       <i className="ri-user-2-line auti-custom-input-icon" />
                                       <Form.Label>Username</Form.Label>
                                       <Form.Control
                                          value={h.parseObject(input, "username")}
                                          onChange={(e) => setInput((prev) => ({ ...prev, username: e.target.value }))}
                                          isInvalid={h.is_invalid(errors.username)}
                                          placeholder="Masukkan username anda disini..."
                                          autoFocus
                                       />
                                       {h.msg_response(errors.username)}
                                    </div>
                                    <div className="auth-form-group-custom mb-4 form-group">
                                       <i className="ri-lock-line auti-custom-input-icon" />
                                       <Form.Label>Password</Form.Label>
                                       <Form.Control
                                          value={h.parseObject(input, "password")}
                                          onChange={(e) => setInput((prev) => ({ ...prev, password: e.target.value }))}
                                          isInvalid={h.is_invalid(errors.password)}
                                          type="password"
                                          placeholder="Masukkan password anda disini..."
                                       />
                                       {h.msg_response(errors.password)}
                                    </div>
                                    <div className="mt-4 text-center">{h.buttons("Login", isSubmit)}</div>
                                 </Form>
                              </div>
                           </div>
                        </Col>
                     </Row>
                  </div>
               </div>
            </Col>
            <Col lg={6} sm={12}>
               <div className="authentication-bg lozad" data-background-image="/assets/secure-login-animate.svg" />
            </Col>
         </Row>
      </Container>
   );
};
export default Login;
