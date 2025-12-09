const express=require("express")
const app=express()
const cors=require("cors")
const path=require("path")
const sqlite3=require("sqlite3")
const {open}=require("sqlite")
const dbpath=path.join(__dirname,"shop.db")
app.use(express.json())
app.use(cors())
let db=null
const dbandserver=async()=>{
db=await open({
    filename:dbpath,
    driver:sqlite3.Database
})
app.listen(3000,()=>{
    console.log("Server running...")
})
}
dbandserver()

app.get("/cart",async(req,res)=>{
    query=`select * from cart`
    dbres=await db.all(query)
    res.send(dbres)
})
app.post("/cart", async (req, res) => {
  try {
    const { id,title,price,imageUrl,brand} = req.body;

    const existing = await db.get(`SELECT * FROM cart WHERE id=?`, [id]);

    if (existing) {
      await db.run(
        `UPDATE cart SET qty = qty + 1 WHERE id=?`,
        [id]
      );
      return res.json({ message: "Quantity updated" });
    }

        await db.run(
      `INSERT INTO cart (id, title, price, imageUrl, qty,brand) VALUES (?, ?, ?, ?, ?,?)`,
      [id, title, price, imageUrl, 1,brand]
    );

    res.json({ message: "Product added to cart" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
});
app.put("/cart/inc/:id",async(req,res)=>{
    const {id}=req.params
    query=`update cart set qty=qty+1 where id=${id}`
    await db.run(query);
    res.json("updated qty")
})
app.put("/cart/dec/:id",async(req,res)=>{
    const {id}=req.params
    query=`UPDATE cart
SET qty = CASE 
            WHEN qty > 1 THEN qty - 1
            ELSE qty
          END
WHERE id = ${id};
`
    await db.run(query);
    res.json("updated qty")
})

app.delete("/cart/del/:id",async(req,res)=>{
const {id}=req.params
query=`delete from cart where id=${id}`
await db.run(query)
res.send("item deleted")
})