import React, { useState, useEffect, useCallback } from "react";

// import { map } from "lodash";
import { map } from "lodash";

import { toast } from "react-toastify";

import { v4 as uuidv4 } from "uuid";

import {
  Form,
  Button,
  Input,
  Image,
  Dropdown,
  FormGroup,
} from "semantic-ui-react";

import { useDropzone } from "react-dropzone";

import NoImage from "../../../assets/png/no-image.png";

import "./AddAlbumForm.scss";

import firebase from "../../../utils/Firebase";

import "firebase/firestore";
import "firebase/storage";

const cableadoArtista = [
  {
    key: "061e6cf5-a7ab-4258-8850-dec46fe250c7",
    value: "061e6cf5-a7ab-4258-8850-dec46fe250c7",
    text: "cariboludo",
  },
  {
    key: "ea98edff-800e-42e1-aa8b-5e14874b7016",
    value: "ea98edff-800e-42e1-aa8b-5e14874b7016",
    text: "eminem",
  },
  {
    key: "fb82221b-50b3-48f3-bab4-7f868fbe3130",
    value: "fb82221b-50b3-48f3-bab4-7f868fbe3130",
    text: "snoop dog",
  },
  {
    key: "55084f05-7064-4594-a145-05ca827b3148",
    value: "55084f05-7064-4594-a145-05ca827b3148",
    text: "Muertinho",
  },
  {
    key: "dd58a54c-4b10-4988-a869-64f57e850149",
    value: "dd58a54c-4b10-4988-a869-64f57e850149",
    text: "momoland",
  },
  {
    key: "013ee65d-b6ce-4fc2-9366-f4b7737c0b53",
    value: "013ee65d-b6ce-4fc2-9366-f4b7737c0b53",
    text: "NoCanto",
  },
  {
    key: "42f88700-fef4-4001-bfe7-1a0074f688ef",
    value: "42f88700-fef4-4001-bfe7-1a0074f688ef",
    text: "bananero",
  },
];

const db = firebase.firestore(firebase);

export default function AddAlbumForm(props) {
  const { setShowModal } = props;

  const [albumImage, setAlbumImage] = useState(null);

  const [file, setFile] = useState(null);

  const [artists, setArtists] = useState([]);

  const [formData, setFormData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    db.collection("artists")
      .get()
      .then((response) => {
        const arrayArtists = [];
        map(response?.docs, (artist) => {
          const data = artist.data();
          arrayArtists.push({
            key: artist.id,
            value: artist.id,
            text: data.name,
          });
        });
        setArtists(arrayArtists);
      });
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setAlbumImage(URL.createObjectURL(file));
  }, []);

  const uploadImage = (fileName) => {
    const ref = firebase.storage().ref().child(`album/${fileName}`);
    return ref.put(file);
  };

  const onSubmit = () => {
    if (!formData.name || !formData.artist) {
      toast.warning("El nombre del album y el artista son obligatorios.");
    } else if (!file) {
      toast.warning("La imagen del albunm es obligatoria");
    } else {
      setIsLoading(true);
      const fileName = uuidv4();
      uploadImage(fileName)
        .then(() => {
          db.collection("albums")
            .add({
              name: formData.name,
              artist: formData.artist,
              banner: fileName,
            })
            .then(() => {
              toast.success("Album creado.");
              resetForm();
              setIsLoading(false);
              setShowModal(false);
            })

            .catch(() => {
              toast.warning("Error al crear el album.");
              setIsLoading(false);
            });
        })
        .catch(() => {
          console.log(fileName);
          toast.warning("Error al subir la imagen del álbum.");
          setIsLoading(false);
        });
    }
  };
  const resetForm = () => {
    setFormData(initialValueForm);
    setFile(null);
    setAlbumImage(null);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <Form className="add-album-form" onSubmit={onSubmit}>
      <FormGroup>
        <Form.Field className="album-avatar" width={5}>
          <div
            {...getRootProps()}
            className="avatar"
            style={{
              backgroundImage: `url('${albumImage}')`,
            }}
          />
          <input {...getInputProps()} />
          {!albumImage && <Image src={NoImage} />}
        </Form.Field>

        <Form.Field className="album-inputs" width={11}>
          <Input
            placeholder="Nombre del album"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Dropdown
            placeholder="El album pertenence..."
            fluid
            search
            selection
            options={artists}
            lazyLoad
            onChange={(e, data) =>
              setFormData({ ...formData, artist: data.value })
            }
          />
        </Form.Field>
      </FormGroup>
      <Button type="submit" loading={isLoading}>
        Crear album
      </Button>
    </Form>
  );
}

function initialValueForm() {
  return {
    name: "",
    artist: "",
  };
}
