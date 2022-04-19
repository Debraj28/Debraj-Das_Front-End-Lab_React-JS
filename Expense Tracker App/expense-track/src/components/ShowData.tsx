import DataList from "../model/DataList";
import { getDataFromServer } from "../service/apiService";
import { useState, useEffect } from "react";
import Form from "./Form";
import React from "react";

function ShowData() {

    const [items, setItems] = useState<DataList[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [sum, setSum] = useState<number | null>()
    const [rahulspent, setRahulspent] = useState<number>(0)
    const [debrajspent, setDebrajspent] = useState<number>(0)

    let rahulspent1 = 0;
    let debrajspent1 = 0;



    useEffect(
        () => {

            const getData = async () => {
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((result, v) => result = result + v.price, 0))
                Shares(data);
            }
            getData();
        },

        [showForm]
    );

    const Shares = (data: DataList[]) => {

        data.map(
            sams => (
                sams.payeeName === "Rahul" ? (
                    rahulspent1 = rahulspent1 + sams.price
                ) :
                    (
                        debrajspent1 = debrajspent1 + sams.price
                    )
            )
        )
        setRahulspent(rahulspent1)
        setDebrajspent(debrajspent1)
    }

    const success = () => {
        setShowForm(false)
    }
    const cancel = () => {
        setShowForm(false)
    }

    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
            {
                showForm && (
                    <div className="form">
                        <Form onTrue={success} onClose={cancel} />
                    </div>
                )
            }
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
            </>

            {
                items && (
                    items.map(
                        (user, idx) => {
                            return (
                                <div key={idx}>
                                    <div className="use-inline date">{user.setDate}</div>
                                    <div className="use-inline">{user.product}</div>
                                    <div className="use-inline price">{user.price}</div>
                                    <div className="use-inline" style={{ width: 112 }}>{user.payeeName}</div>
                                </div>
                            )
                        }
                    )
                )
            }
            <hr></hr>
            <div className="use-inline">Total: </div>
            <span className="use-inline total">{sum}</span> <br />
            <div className="use-inline ">Rahul paid: </div>
            <span className="use-inline total Rahul">{rahulspent}</span> <br />
            <div className="use-inline ">Debraj paid: </div>
            <span className="use-inline total Debraj">{debrajspent}</span> <br />
            <span className="use-inline payable">{rahulspent > debrajspent ? "Pay Rahul " : "Pay Debraj"}</span>
            <span className="use-inline payable price"> {Math.abs((rahulspent - debrajspent) / 2)}</span>
        </>

    )
}

export default ShowData;
