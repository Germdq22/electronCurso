import React from "react";
import "./ListSongs.scss";
import { Table, Icon } from "semantic-ui-react";
import { map } from "lodash";

export default function ListSongs(props) {
  const { songs, albumImg } = props;
  return (
    <Table inverted className="list-songs">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell collapsing>
            <Icon name="play circle outline" />
          </Table.Cell>

          <Table.cell>Canción 091</Table.cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
