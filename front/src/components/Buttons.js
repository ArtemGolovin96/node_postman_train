import "./Buttons.css";
import { PureComponent } from "react";

export default class Buttons extends PureComponent {
  state = {
    dataFromPapaBack: [],
    money: 0,
    checker: false,
    onSubmitDataPost: [],
  };

  onSubmitF = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = [...formData.values()];
    this.postDataFromForm(data);
  };

  postDataFromForm = (data) => {
    console.log(data);
    const bodyJSON = JSON.stringify({ data: data });
    console.log(bodyJSON);
    fetch(`http://localhost:7777/${+data[0]}`, {
      method: "POST",
      headers: {
        "content-type": "application/JSON; charset=UTF-8",
      },
      body: bodyJSON,
    });
  };

  onClickAll = () => {
    this.getDataFromPapaOnClickAllFishings();
  };

  onClickCater = () => {
    this.getDataFromPapaOnClickCater();
  };

  onClickPier = () => {
    this.getDataFromPapaOnClickPier();
  };

  onClickBeach = () => {
    this.getDataFromPapaOnClickBeach();
  };

  onClickFraht = () => {
    this.getDataFromPapaOnClickFraht();
  };

  onClickDelete = (arg) => {
    console.log(arg);
    this.deleteDataFromPapaOnClickDelete(arg);
  };

  getDataFromPapaOnClickAllFishings = () => {
    fetch("http://localhost:7777/allfish")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ dataFromPapaBack: data });
        this.setState({
          money: data.reduce((acc, el) => {
            return acc + el.price;
          }, 0),
        });
      });
  };

  getDataFromPapaOnClickCater = () => {
    fetch("http://localhost:7777/cater")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ dataFromPapaBack: data });
        this.setState({
          money: data.reduce((acc, el) => {
            return acc + el.price;
          }, 0),
        });
      });
  };

  getDataFromPapaOnClickPier = () => {
    fetch("http://localhost:7777/pier")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ dataFromPapaBack: data });
        this.setState({
          money: data.reduce((acc, el) => {
            return acc + el.price;
          }, 0),
        });
      });
  };

  getDataFromPapaOnClickBeach = () => {
    fetch("http://localhost:7777/beach")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ dataFromPapaBack: data });
        this.setState({
          money: data.reduce((acc, el) => {
            return acc + el.price;
          }, 0),
        });
      });
  };

  getDataFromPapaOnClickFraht = () => {
    fetch("http://localhost:7777/fraht")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ dataFromPapaBack: data });
        this.setState({
          money: data.reduce((acc, el) => {
            return acc + el.price;
          }, 0),
        });
      });
  };

  deleteDataFromPapaOnClickDelete = (el) => {
    fetch(`http://localhost:7777/${el}`, {
      method: "DELETE",
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        this.setState({
          dataFromPapaBack: this.state.dataFromPapaBack.filter((item) => {
            if (item[""] !== el) {
              return item;
            }
          }),
        });
        this.setState({
          money: res.reduce((acc, el) => {
            return acc + el.price;
          }, 0),
        });
      });
  };

  render() {
    return (
      <div className="buttons-container_main-container">
        <div className="buttons-container">
          <button className="button all" onClick={this.onClickAll}>
            ???????????????? ??????
          </button>
          <button
            className="button all"
            onClick={this.getDataFromPapaOnClickCater}
          >
            ?????????????? ?? ????????????
          </button>
          <button
            className="button all"
            onClick={this.getDataFromPapaOnClickPier}
          >
            ?????????????? ?? ??????????
          </button>
          <button
            className="button all"
            onClick={this.getDataFromPapaOnClickBeach}
          >
            ?????????????? ?? ??????????
          </button>
          <button
            className="button all"
            onClick={this.getDataFromPapaOnClickFraht}
          >
            ???????????????????? ??????????
          </button>
          <div className="howmoney">
            <h3>?????????????? $ ??????????: {this.state.money.toFixed(2)}</h3>
            <form
              onSubmit={(e) => this.onSubmitF(e)}
            >
              <p>???????????????? ????????????</p>
              <input placeholder="id" name="body_id"></input>
              <input placeholder="?????? ??????????????" name="body_mode"></input>
              <input placeholder="???????? ?? $" name="body_ price"></input>
              <button type="submit">????????????????</button>
            </form>
          </div>
        </div>
        <main className="main">
          <table className="table">
            <caption className="nameoftable">???????????? ?? ??????????????</caption>
            <thead>
              <tr className="trhead">
                <th>???????????????????? ??????????</th>
                <th>?????? ??????????????</th>
                <th>???????? ?? $</th>
              </tr>
            </thead>

            {this.state.dataFromPapaBack.map((el) => (
              <tr className="trtr">
                {" "}
                <td>{el[""] + 1}</td> <td>{el.mode}</td>
                <td>{el.price.toFixed(2)}$</td>{" "}
                <button
                  className="delete"
                  title="?????????????? ??????????????"
                  onClick={() => this.onClickDelete(el[""])}
                >
                  ???
                </button>{" "}
              </tr>
            ))}
          </table>
        </main>
      </div>
    );
  }
}
