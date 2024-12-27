let entertainmentExpenses = [];
let travelExpenses = [];
let tourismExpenses = [];

function storeExpense(category,act,actam) {
    let data = {};
    if (category === 'entertainment') {
        const activity = document.getElementById('activity').value;
        const amount = parseFloat(document.getElementById('activityamount').value) || 0;

        data = { activity, amount };
        entertainmentExpenses.push(data);
    } else if (category === 'travel') {
        const destiny = document.getElementById('destiny').value;
        const amount = parseFloat(document.getElementById('destinyamount').value) || 0;

        data = { destiny, amount };
        travelExpenses.push(data);
    } else if (category === 'tourism') {
        const place = document.getElementById('place').value;
        const amount = parseFloat(document.getElementById('placeamount').value) || 0;

        data = { place, amount };
        tourismExpenses.push(data);
    }
    document.getElementById(act).value='';
    document.getElementById(actam).value='';
    alert("Expense added successfully!");
}

function calculateTotalExpense() {
    const total = [
        ...entertainmentExpenses,
        ...travelExpenses,
        ...tourismExpenses
    ].reduce((sum, entry) => sum + (parseFloat(entry.amount) || 0), 0);

    return total;
}

function calculateCategoryExpense(category) {
    const data = getCategoryExpenses(category);
    return data.reduce((sum, entry) => sum + (parseFloat(entry.amount) || 0), 0);
}


function getCategoryExpenses(category) {
    if (category === 'entertainment') {
        return entertainmentExpenses;
    } else if (category === 'travel') {
        return travelExpenses;
    } else if (category === 'tourism') {
        return tourismExpenses;
    }
    return [];
}


function showExpenses(category) {
    const data = getCategoryExpenses(category);
    const total = calculateCategoryExpense(category);

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
        <html lang="en">
            <head>
                <title>${category.charAt(0).toUpperCase() + category.slice(1)} Expenses</title>
                <style>
                    body { background-color: rgb(242, 237, 198); font-family: Arial, sans-serif; padding: 20px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f4f4f4; }
                    h1, p { text-align: center; color: #333; }
                </style>
            </head>
            <body>
                <h1>${category.charAt(0).toUpperCase() + category.slice(1)} Expenses</h1>
                <p>Total for ${category}:Rs.${total.toFixed(2)}</p>
                <table>
                    <thead>
                        <tr>
                            ${Object.keys(data[0] || {}).map(key => `<th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(entry => `
                            <tr>
                                ${Object.values(entry).map(value => `<td>${value}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
        </html>
    `);
}

function showTotalExpense() {
    const allExpenses = [
        ...entertainmentExpenses.map(entry => ({ category: "Entertainment", ...entry })),
        ...travelExpenses.map(entry => ({ category: "Travel", ...entry })),
        ...tourismExpenses.map(entry => ({ category: "Tourism", ...entry }))
    ];

    const total = allExpenses.reduce((sum, entry) => sum + (parseFloat(entry.amount) || 0), 0);

    const tableRows = allExpenses.map(entry => `
        <tr>
            <td>${entry.category}</td>
            <td>${Object.keys(entry)
                .filter(key => key !== 'category' && key !== 'amount')
                .map(key => `${key}: ${entry[key]}`)
                .join(', ')}</td>
            <td>${entry.amount.toFixed(2)}</td>
        </tr>
    `).join('');

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Total Expenses</title>
                <style>
                    body { background-color: rgb(242, 237, 198); font-family: Arial, sans-serif; padding: 20px; }
                    h1 { text-align: center; color: #333; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f4f4f4; }
                    tr:nth-child(even) { background-color: #f9f9f9; }
                </style>
            </head>
            <body>
                <h1>Total Expenses</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                        <tr>
                            <td colspan="2"><strong>Total</strong></td>
                            <td><strong>Rs.${total.toFixed(2)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    `);

    newWindow.document.close(); 
}
