import axios from "axios";

const baseURL =
  "https://react-native-course-cf399-default-rtdb.europe-west1.firebasedatabase.app";

export async function storeExpense(exepnseData) {
  const response = await axios.post(`${baseURL}/expenses.json`, exepnseData);
  const id = response.data.name;

  return id;
}

export async function fetchExpenses() {
    const response = await axios.get(`${baseURL}/expenses.json`);
    const expenses = [];

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        expenses.push(expenseObj);
    }
    return expenses;
}

export function updateExpense(id, expenseData) {
    return axios.put(baseURL + `/expenses/${id}.json`, {expenseData});
}

export function deleteExpense(id) {
    return axios.delete(baseURL + `/expenses/${id}.json`);
}