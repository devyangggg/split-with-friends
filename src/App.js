import { useState } from "react";
const defaultImg =
  "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";
const friends = [
  {
    id: 118836,
    name: "Ramesh",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Bittu",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Mukesh",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
//const friends = [];

export default function App() {
  const [isSplitOpen, setIsSplitOpen] = useState(false);
  const [newFriend, setNewFriend] = useState("");
  const [newFriendImg, setNewFriendImg] = useState(defaultImg);
  const [addNewFriend, setAddNewFriend] = useState(friends);
  const [whoPays, setWhoPays] = useState("");
  const [myExpense, setMyExpense] = useState(null);
  const [newBalance, setNewBalance] = useState(0);
  const [whoPaysId, setWhoPaysId] = useState(null);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          setIsSplitOpen={setIsSplitOpen}
          isSplitOpen={isSplitOpen}
          addNewFriend={addNewFriend}
          setAddNewFriend={setAddNewFriend}
          newFriend={newFriend}
          setWhoPays={setWhoPays}
          setWhoPaysId={setWhoPaysId}
        />
        <Form
          newFriend={newFriend}
          setNewFriend={setNewFriend}
          newFriendImg={newFriendImg}
          setNewFriendImg={setNewFriendImg}
          addNewFriend={addNewFriend}
          setAddNewFriend={setAddNewFriend}
          newBalance={newBalance}
        />
      </div>
      <CheckSplit
        isSplitOpen={isSplitOpen}
        whoPays={whoPays}
        whoPaysId={whoPaysId}
        myExpense={myExpense}
        setMyExpense={setMyExpense}
        setNewBalance={setNewBalance}
        newBalance={newBalance}
        setAddNewFriend={setAddNewFriend}
        addNewFriend={addNewFriend}
      />
    </div>
  );
}

function FriendList({
  setIsSplitOpen,
  isSplitOpen,
  addNewFriend,
  setWhoPays,
  setWhoPaysId,
}) {
  return (
    <div>
      <ul>
        {addNewFriend.map((data) => (
          <FriendCard
            data={data}
            key={data.id}
            setIsSplitOpen={setIsSplitOpen}
            isSplitOpen={isSplitOpen}
            setWhoPays={setWhoPays}
            setWhoPaysId={setWhoPaysId}
          />
        ))}
      </ul>
    </div>
  );
}
function FriendCard({
  data,
  setIsSplitOpen,
  isSplitOpen,
  setWhoPays,
  setWhoPaysId,
}) {
  function handleSelect() {
    setIsSplitOpen(!isSplitOpen);
    setWhoPays(data.name);
    setWhoPaysId(data.id);
  }
  return (
    <div>
      <li>
        <img src={data.image} alt={data.name} />
        <h3>{data.name}</h3>
        <p
          className={
            data.balance < 0 ? "red" : data.balance === 0 ? "" : "green"
          }
        >
          {data.balance < 0
            ? `You owe Rs ${-data.balance}`
            : data.balance === 0
            ? ""
            : `You deserve Rs ${data.balance}`}
        </p>
        <button className="button" onClick={handleSelect}>
          Select
        </button>
      </li>
    </div>
  );
}
function Form({
  newFriend,
  setNewFriend,
  newFriendImg,
  setNewFriendImg,
  addNewFriend,
  setAddNewFriend,
  newBalance,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleAdd() {
    const friendData = {
      name: newFriend,
      image: newFriendImg,
      id: Date.now(),
      balance: newBalance,
    };
    setAddNewFriend(() => [...addNewFriend, friendData]);

    setIsOpen(!isOpen);
  }

  if (!isOpen) {
    return (
      <button className="button" onClick={() => setIsOpen(!isOpen)}>
        Add
      </button>
    );
  }

  return (
    <div>
      <button className="button" onClick={() => setIsOpen(!isOpen)}>
        Close
      </button>
      <form className="form-add-friend" onSubmit={(e) => e.preventDefault()}>
        <label>😍 Friend Name</label>
        <input
          type="text"
          value={newFriend}
          onChange={(e) => setNewFriend(e.target.value)}
        />
        <label>🌌 Image URL</label>
        <input
          type="text"
          value={newFriendImg}
          onChange={(e) => setNewFriendImg(e.target.value)}
        />
        <button className="button" onClick={handleAdd}>
          Add
        </button>
      </form>
    </div>
  );
}
function CheckSplit({
  isSplitOpen,
  whoPays,
  whoPaysId,
  myExpense,
  setAddNewFriend,
  addNewFriend,
  setMyExpense,
  setNewBalance,
  newBalance,
}) {
  const [bill, setBill] = useState(0);
  const friendExp = Number(bill) - Number(myExpense);
  function handleSplit(e) {
    if (e.target.value === "friend") {
      setNewBalance(-Number(myExpense));
    } else if (e.target.value === "user") {
      setNewBalance(Number(bill) - Number(myExpense));
    }
  }
  function handleSplitBtn() {
    setAddNewFriend(() =>
      addNewFriend.map((item) =>
        item.id === whoPaysId ? { ...item, balance: newBalance } : item
      )
    );
    console.log(addNewFriend);
  }
  if (!isSplitOpen) return;
  return (
    <form className="form-split-bill" onSubmit={(e) => e.preventDefault()}>
      <h2>Split a bill with {whoPays}</h2>

      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />

      <label>💵 Your expenses</label>
      <input
        type="text"
        value={myExpense}
        onChange={(e) => setMyExpense(e.target.value)}
      />

      <label>💵 {whoPays}'s expenses</label>
      <input type="text" disabled value={friendExp} />

      <label>🥺 Who is paying the bill?</label>
      <select onChange={handleSplit}>
        <option>Choose</option>
        <option value="user">You</option>
        <option value="friend">{whoPays}</option>
      </select>
      <button className="button" onClick={handleSplitBtn}>
        Split Bill
      </button>
    </form>
  );
}
