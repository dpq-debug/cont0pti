function calculate() {
  let totalCBM = parseFloat(document.getElementById("totalCbm").value); // fixed cargo volume
  let totalCapacity = 0;

  const containerTypes = document.querySelectorAll(".containerType");
  const containerQtys = document.querySelectorAll(".containerQty");

  // Calculate total container capacity
  for (let i = 0; i < containerTypes.length; i++) {
    let cbm = parseFloat(containerTypes[i].value);
    let qty = parseInt(containerQtys[i].value) || 0;
    totalCapacity += cbm * qty;
  }

  // Minimum required for optimized = 90% of container capacity
  let minimum90 = totalCapacity * 0.9;
  let displayMinimum90 = totalCBM * 0.9;
  let remark = "";

  // Correct logic
  if (totalCBM >= minimum90 && totalCBM <= totalCapacity) {
    remark = "✅ OPTIMIZED — Within 90% to 100% of Total CBM";
  } else if (totalCBM < minimum90) {
    remark = "❌ NOT OPTIMIZED — Exceeds Total CBM";
  } else if (totalCBM > totalCapacity) {
    remark = "❌ NOT OPTIMIZED — CONT NEEDED (Does not meet 90% of Total CBM)";
  }

  // Display results
  document.getElementById("result").innerHTML = `
    <b>Your Total Container Capacity:</b> ${totalCapacity.toFixed(2)} CBM<br>
    <b>Minimum Required (90% of TOTAL CBM):</b> ${displayMinimum90.toFixed(2)} CBM<br>
    <b>Total CBM:</b> ${totalCBM.toFixed(2)} CBM<br><br>
    <b>Remarks:</b> ${remark}
  `;
}
function resetForm() {
  // Clear number of containers
  const containerQtys = document.querySelectorAll(".containerQty");
  containerQtys.forEach(input => input.value = 0);

  // Reset container types to first option
  const containerTypes = document.querySelectorAll(".containerType");
  containerTypes.forEach(select => select.selectedIndex = 0);

  // Clear result box
  document.getElementById("result").innerHTML = "";
}