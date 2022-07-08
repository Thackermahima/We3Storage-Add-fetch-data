import React, { useState, useEffect} from "react";
import { Web3Storage } from "web3.storage";
import { useFormik } from "formik";
import { TextareaAutosize, Button, Grid, Container } from "@mui/material";
import { useMoralis, useMoralisQuery } from "react-moralis";
import "./Create.css";
const Create = () => {
  const [loading, setLoading] = useState(false);
  const [Pagerefesh, setPageRefresh] = useState(false);


  useEffect(() => {
    fetch()
  }, [Pagerefesh])

  const { Moralis } = useMoralis();
  const apiToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIzOEQzNkJhOTIwOWU0NDhCMzZEOGYwNzQ2MzE4ZGFiNmUyNzUwQmYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTcxNzQ4Mzc4MzUsIm5hbWUiOiJDUlVELXdlYjNTdG9yYWdlIn0.fTaQgOXp6_L16eYjYRYJCAgXENT9g2anLmkCZnt2M0k";
  const client = new Web3Storage({ token: apiToken });

  const web3Storage = Moralis.Object.extend("web3StorageData");
  const web3Stor = new web3Storage();
  const { data } = useMoralisQuery("web3StorageData");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contact: "",
    },

    onSubmit: async (values, { resetForm }) => {
      const obj = {
        name: values.name,
        email: values.email,
        contact: values.contact,
      };

      console.log(obj, "obj");
      try {
        setLoading(true);
        function addData() {
          const blob = new Blob(
            [
              JSON.stringify({
                name: obj.name,
                email: obj.email,
                contact: obj.contact,
              }),
            ],
            { type: "application/json" }
          );
          const files = [
            //  new File(['contents-of-files-1'], 'plain-utf8.txt'),
            new File([blob], "data.json"),
          ];
          console.log(files);
          return files;
        }

        addData();
        async function storeFiles() {
          let files = addData();
          const cid = await client.put(files);
          web3Stor.set("CID", cid);
          web3Stor.set("name", obj.name);
          web3Stor.set("email", obj.email);
          web3Stor.set("contact", obj.contact);
          web3Stor.save();
          setPageRefresh(!Pagerefesh)
          console.log("stored files with cid:", cid);
          return cid;
        }
        storeFiles();

        setLoading(false);
      } catch (error) {
        setLoading(false);
        // console.log(error);
        alert(error);
      }
      resetForm();
    },
  });

  return (
    <Container>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            justifyContent: "center",
            marginLeft: "30vw",
          }}
        >
          <TextareaAutosize
            fullwidth
            required
            aria-label="minimum height"
            placeholder="Enter your name here!"
            style={{
              width: "auto",
              borderColor: "#009879",
              borderRadius: "5px",
              marginTop: "60px",
            }}
            {...formik.getFieldProps("name")}
          ></TextareaAutosize>
          <br />
          <TextareaAutosize
            fullwidth
            required
            aria-label="minimum height"
            placeholder="Enter your email here!"
            style={{
              width: "auto",
              borderColor: "#009879",
              borderRadius: "5px",
              marginTop: "60px",
            }}
            {...formik.getFieldProps("email")}
          ></TextareaAutosize>
          <br />

          <TextareaAutosize
            fullwidth
            required
            aria-label="minimum height"
            placeholder="Enter your contact here!"
            style={{
              width: "auto",
              borderColor: "#009879",
              borderRadius: "5px",
              marginTop: "60px",
            }}
            {...formik.getFieldProps("contact")}
          ></TextareaAutosize>

          <Grid container justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              size="lg"
              style={{
                backgroundColor: "#009879",
                textTransform: "capitalize",
                border: "2px solid #009879",
                fontWeight: "bold",
                marginRight: "32vw",
                marginBottom: "4vw",
              }}
              sx={{ borderRadius: 2, mt: 5 }}
            >
              Submit
            </Button>
          </Grid>
        </form>

        <div>
          <table
            style={{
              margin: "auto",
              paddingTop: "80px",
            }}
            className="styledTable"
          >
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>CID</th>
              </tr>
            </thead>

            <tbody>
              {data.map((obj, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{obj.attributes.name}</td>
                    <td>{obj.attributes.email}</td>
                    <td>{obj.attributes.contact}</td>
                    <td>{obj.attributes.CID}</td>
                  </tr>
                );
              }
)}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Create;
