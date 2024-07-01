import React from "react";
import UsersTable from "./UsersTable";

const Users = () => {

  return (
    <>
 

      <UsersTable />

      {/* <div className="card shadow border-0">
        <div className="card-body d-flex justify-content-center">
          <div className="w-100">
            <div class="container mt-3">
              <div className="table-responsive">
                <table class="table table-borderless">
                  <thead>
                    <tr
                      className="text-muted shadow border rounded-3"
                      style={{ backgroundColor: "#4545501A" }}
                    >
                      <th className="p-3">Name</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">company</th>
                      <th className="p-3">country</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.map((item, index) => (
                      <tr key={index} className="shadow-sm border rounded-3 ">
                        <td className="p-3">
                          <div>
                            <p className="m-0"> {item.firstName}</p>
                            <small className="text-muted">{item.email}</small>
                          </div>
                        </td>
                        <td className="p-3">
                          <>
                            <div class="form-check form-switch">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked"
                                checked={item.status === "1"}
                                style={{
                                  backgroundColor: `${
                                    item.status === "1" ? "green" : "#f64848d1"
                                  }`,
                                }}
                                onChange={() => {
                                  toggleUserStatus(item._id, item.status);
                                }}
                              />
                              <label
                                class="form-check-label"
                                for="flexSwitchCheckChecked"
                              >
                                {item.status === "1" ? "Active" : "InActive"}
                              </label>
                            </div>
                          </>
                        </td>
                        <td className="pt-3">{item?.company[0]}</td>
                        <td className="pt-3">{item.country}</td>
                        <td className="pt-3">
                          <div class="dropdown ">
                            <button
                              class="btn border-0 "
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <MoreVertIcon />
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <a
                                  class="dropdown-item"
                                  onClick={() => {
                                    UserPlanModalScreen();

                                    setuserId(item._id);
                                  }}
                                  href="#"
                                >
                                  View Plans
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  View Profile
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> */}

   
    </>
  );
};

export default Users;
