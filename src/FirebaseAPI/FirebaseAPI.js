class FirebaseAPI {
  constructor() {
    this.API_KEY = process.env.REACT_APP_API_KEY;
    this.DB_URL = process.env.REACT_APP_DB_URL;
  }

  async login(userData) {
    const auth = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        alert(err.message);
      });

    return auth;
  }

  async addMember(member, token) {
    const response = await fetch(`${this.DB_URL}/members.json?auth=${token}`, {
      method: "POST",
      body: JSON.stringify(member),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Fetch data Failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            if (res.status === 401) {
              errorMessage = "Unauthorized";
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((resData) => {
        return resData.name;
      });
    return { ...{ id: response }, ...member };
  }

  async updateMember(member, id, token) {
    const response = await fetch(
      `${this.DB_URL}/members/${id}/.json?auth=${token}`,
      {
        method: "PATCH",
        body: JSON.stringify(member),
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Fetch data Failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            if (res.status === 401) {
              errorMessage = "Unauthorized";
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((resData) => {
        return resData;
      });

    return { ...{ id: id }, ...response };
  }

  async getMember(token) {
    const res = await fetch(`${this.DB_URL}/members.json?auth=${token}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Fetch data Failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            if (res.status === 401) {
              errorMessage = "Unauthorized";
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((responseData) => {
        if (!!responseData) {
          const loadedMembers = [];

          for (const key in responseData) {
            loadedMembers.push({
              id: key,
              name: responseData[key].name,
              role: responseData[key].role,
              power: responseData[key].power,
              lane: responseData[key].lane,
              team: responseData[key].team,
            });
          }
          return loadedMembers;
        }
      })
      .catch((err) => {
        alert(err.message);
      });
    return res;
  }

  async deleteMember(id, token) {
    await fetch(`${this.DB_URL}/members/${id}.json?auth=${token}`, {
      method: "DELETE",
    });
    return id;
  }
}

export default FirebaseAPI;
