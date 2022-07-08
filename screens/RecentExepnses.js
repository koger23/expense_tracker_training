import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/ExpensesOutput/UI/ErrorOverlay";
import LoadingOverlay from "../components/ExpensesOutput/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getdateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
      const expenses = await fetchExpenses();
      } catch (error) {
        setError("Could not fetch expenses!");
        console.error(error);
      }
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
    }

    getExpenses();
  }, []);

  // const recentExpenses = expensesCtx.expenses.filter((expense) => {
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getdateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  function ErrorHandler() {
    setError(null);
  }
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={ErrorHandler} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText={"No expenses registered for the last 7 days."}
    />
  );
}

export default RecentExpenses;
