import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [data, setData] = useState();
  const [value, setValue] = useState({
    content: "",
    dueDate: "",
    statues: "",
    assignedTo: "",
  });
  const [editElement, setEditElement] = useState(-1);
  const [editStatus, setEditStatus] = useState(true);

  const handleChangeValue = (event) => {
    const newValue = { ...value, [event.target.name]: event.target.value };
    setValue(newValue);
  };
  const handleConfirm = async () => {
    await axios.put(`http://localhost:4000/api/v1/tasks/${editElement}`, value);
    setEditElement(-1);
  };
  function convertToValidDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const database = async () => {
    const response = await axios.get("http://localhost:4000/api/v1/tasks");
    console.log(response.data.result);
    setData(response.data.result);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/v1/tasks", value);
    database();
  };
  const handleEdit = (id) => {
    setEditElement(id);
  };
  const handleChangeValueEdit = (event) => {
    const index = data.findIndex((e) => {
      return e.id == editElement;
    });
    console.log("does it run in to handleChangeEdit", index);
    const newData = [...data];
    newData[index] = {
      ...data[index],
      [event.target.name]: event.target.value,
    };
    console.log(event.target.name, event.target.value);
    console.log(newData);
    setData(newData);
  };
  const handleDelete = (id) => {
    console.log(id, "does it run into delete");
    axios.delete(`http://localhost:4000/api/v1/tasks/${id}`);
    database();
  };
  useEffect(() => {
    database();
  }, [value]);
  return (
    <div className="App">
      <form action="" onSubmit={handleSubmit}>
        <div style={{ display: "flex" }}>
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">
              @
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Content"
              aria-label="Username"
              name="content"
              aria-describedby="addon-wrapping"
              onChange={handleChangeValue}
            />
          </div>
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">
              @
            </span>
            <input
              type="date"
              class="form-control"
              placeholder="Due date"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              name="dueDate"
              onChange={handleChangeValue}
            />
          </div>
          <select
            class="form-select"
            aria-label="Default select example"
            name="statues"
            onChange={handleChangeValue}
          >
            <option selected value={null}>
              Open this select menu
            </option>
            <option value="pending">pending</option>
            <option value="fulfill">fulfill</option>
            <option value="reject">reject</option>
          </select>
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">
              @
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Assignment to"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              name="assignedTo"
              onChange={handleChangeValue}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <div>
        <table
          style={{
            width: "100%",
            border: "1px solid black",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <th style={{ border: "1px solid black" }}>#</th>
            <th style={{ border: "1px solid black" }}>Content</th>
            <th style={{ border: "1px solid black" }}>Due Date</th>
            <th style={{ border: "1px solid black" }}>Status</th>
            <th style={{ border: "1px solid black" }}>Assigned To</th>
          </thead>
          <tbody>
            {data?.map((e, index) => {
              return (
                <tr>
                  <td style={{ border: "1px solid black" }}>{index + 1}</td>
                  <td style={{ border: "1px solid black" }}>
                    <input
                      type="text"
                      value={e.content}
                      style={{ border: "none", outline: "none" }}
                      disabled={e.id !== editElement ? editStatus : !editStatus}
                      onChange={handleChangeValueEdit}
                      name="content"
                    ></input>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <input
                      type="date"
                      value={convertToValidDate(e.dueDate)}
                      style={{ border: "none", outline: "none" }}
                      disabled={e.id !== editElement ? editStatus : !editStatus}
                      onChange={handleChangeValueEdit}
                      name="dueDate"
                    ></input>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      name="statues"
                      onChange={handleChangeValueEdit}
                      disabled={e.id !== editElement ? editStatus : !editStatus}
                    >
                      <option selected value={e.statues}>
                        {e.statues}
                      </option>
                      <option value="pending">pending</option>
                      <option value="fulfill">fulfill</option>
                      <option value="reject">reject</option>
                    </select>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <input
                      type="text"
                      value={e.assignedTo}
                      style={{ border: "none", outline: "none" }}
                      name="assignedTo"
                      disabled={e.id !== editElement ? editStatus : !editStatus}
                      onChange={handleChangeValueEdit}
                    ></input>
                  </td>
                  <td
                    style={{ border: "1px solid black", cursor: "pointer" }}
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </td>

                  {e.id !== editElement ? (
                    <td
                      style={{ border: "1px solid black", cursor: "pointer" }}
                      onClick={() => handleEdit(e.id)}
                    >
                      Edit
                    </td>
                  ) : (
                    <td
                      style={{ border: "1px solid black", cursor: "pointer" }}
                      onClick={() => handleConfirm()}
                    >
                      confirm
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
