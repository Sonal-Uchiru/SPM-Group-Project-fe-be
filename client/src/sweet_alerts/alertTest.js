import React from "react";
import { SuccessAlert } from "./success";
import { ErrorAlert } from "./error";
import { SaveChangesAlert } from "./saveChanges";
import { DeleteConfirm } from "./deleteConfirm";
export default function AlertTest() {
  async function alertFunction() {
    const flag = await DeleteConfirm();

    if (flag) {
      test();
    }
  }

  function test() {
    alert("sss");
  }
  return (
    <div className="group-summary-card shadow">
      <button onClick={() => alertFunction()}>Test</button>
    </div>
  );
}
