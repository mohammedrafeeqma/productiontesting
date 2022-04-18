import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({}));
var deleteConfirm
const columns = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "firstname", headerName: "First name", width: 130 },
  { field: "lastname", headerName: "Last name", width: 130 },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 130,
  },
  {
    field: "username",
    headerName: "Username",
    description: "This column has a value getter and is not sortable.",
    width: 160,
  }, 
  {
    field: "value",
    headerName: "Value",
    type:"Date",
    description:"this is button",
    width: 180,
    renderCell:(params) => {
      return (
        <div>
          <Button style={{marginRight:'5px'}} onClick={()=>alert(params.id)} variant="contained" color="secondary">View</Button>
          <Button onClick={()=>deleteConfirm(params.id)} style={{marginRight:'4px'}} variant="contained" color="primary">Remove</Button>
        </div>
      )
    }
  }
];

function UsersList() {
  const[rows, setRows] = useState([])
  const classes = useStyles();
  const[confirm, setConfirm] = useState(false)
  const[userId, setUserId] = useState(null)
  const handleGetRowId = (e)=>{
    return e._id
  }

    deleteConfirm = (params)=>{
    setUserId(params)
    setConfirm(true)
  }
  useEffect(async () => {
    try {
      const users = await axios.get("/api/admin/usersList");
      setRows(users.data)
    } catch (error) {}
  },[]);

  const deletePost=async()=>{
    const res = await axios.delete('/api/user/'+userId)
    window.location.reload()
    
}

  return (
    <div>

<Dialog open={confirm} onClose={()=>setConfirm(false)}>
        <DialogTitle style={{fontWeight:700}}>
            Delete?
        </DialogTitle>
        <hr/>
        <DialogContent>
        Items that you delete can't be restored.
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>deletePost()} variant="contained" style={{color:'white', backgroundColor:'#0D8E8E'}}>Delete</Button>
            <Button variant="contained" onClick={()=>setConfirm(false)} style={{color:'#0D8E8E', backgroundColor:'white'}}>Cancel</Button>
        </DialogActions>

    </Dialog>
      
    <div style={{ height: 600, width: "105%", marginTop: "90px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOption={[10]}
        checkboxSelection
        getRowId={handleGetRowId}
        


      />
    </div>
    </div>
  );
}

export default UsersList;
