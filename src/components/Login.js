import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleOnChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmition(this.state);
  }


  render() {
    return (
      <div className="login">
        <form className="auth__form" onSubmit={this.handleSubmit}>
          <h2 className="auth__title">Вход</h2>
          <input
            value={this.state.email || ""}
            onChange={this.handleOnChange}
            className="input auth__input auth__input_type_email"
            name="email"
            id="login-email"
            placeholder="Email"
            type="email"
            minLength="4"
            maxLength="320"
            required
          />
          <input
            value={this.state.password || ""}
            onChange={this.handleOnChange}
            className="input auth__input auth__input_type_password"
            name="password"
            id="login-password"
            placeholder="Пароль"
            type="password"
            minLength="2"
            maxLength="320"
            required
          />
          <button className="button auth__submit-button" type="submit">
            Войти
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
