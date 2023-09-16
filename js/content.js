/**
 * Calculates the total amount of all current credit card charges on the webpage.
 * @returns {number} - The total calculated amount.
 */
function calculateTotal() {
    var totalAmount = 0;
    var creditCards = document.querySelectorAll('.current-amount .number');
    if (!creditCards.length) {
        console.log("Couldn't find any external credit cards.");
        return 0;
    }

    creditCards.forEach(amount => {
        var value = parseFloat(amount.innerText.trim().replace('₪', '').replace(/,/g, '').replace(/\\s/g, ''));
        totalAmount += value;
    });

    return totalAmount;
}

/**
 * Displays the calculated total amount on the webpage.
 * @param {number} total - The total amount to display.
 */
function displayTotalInPage(total) {
    // Check if total is already displayed to avoid duplicates
    if (document.querySelector('#extensionTotalDisplay')) {
        return;
    }

    let h5Element = document.querySelector('.credit-cards-wrapper h5');
    if (!h5Element) {
        return;
    }

    let formattedTotal = total.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    let totalDiv = document.createElement('div');
    totalDiv.id = 'extensionTotalDisplay';
    totalDiv.style.textAlign = 'right';
    totalDiv.style.fontFamily = 'Poalim-Arial,Arial,Helvetica,sans-serif';

    let totalSpan = document.createElement('span');
    totalSpan.innerHTML = `
  <span style="font-size: 1.1em;color: #414b68;">סה"כ חיובים קרובים בש"ח:</span>
  <br>
  <span style="font-size: 1.5em;">${formattedTotal} ₪</span>
`;

    totalSpan.style.fontSize = '1em';

    totalDiv.appendChild(totalSpan);
    h5Element.parentNode.insertBefore(totalDiv, h5Element.nextSibling);
}

let total = calculateTotal();
displayTotalInPage(total);

const observer = new MutationObserver(() => {
    total = calculateTotal();
    if (total !== 0) {
        displayTotalInPage(total);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
