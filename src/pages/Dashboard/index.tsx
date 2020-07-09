/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Container, Box, Collapse } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { AxiosResponse } from 'axios';
import Table from '../../components/Table/index.js';
import Header from '../../components/Header';
import api from '../../services/api';

interface CategoryDataProps {
  id: string;
  name: string;
  description: string;
}

interface DataProps {
  id: string;
  name: string;
  description: string;
  category_id: string;
  category: CategoryDataProps;
  price: number;
  inventory: number;
}

interface ResponseDataProps {
  data: DataProps;
  page: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const categories = () => {
    const obj: any = {};
    api.get('categories').then(response => {
      response.data.forEach((c: CategoryDataProps): void => {
        obj[c.id] = `${c.name}`;
      });
    });
    return obj;
  };
  const [columns] = useState([
    { title: 'Id', field: 'id', readonly: true, editable: 'never' },
    { title: 'Name', field: 'name' },
    {
      title: 'Description',
      field: 'description',
    },
    {
      title: 'Category',
      field: 'category_id',
      lookup: categories(),
    },
    {
      title: 'Price ($)',
      field: 'price',
      type: 'numeric',
    },
    {
      title: 'Inventory (un.)',
      field: 'inventory',
      type: 'numeric',
    },
  ]);

  const handleAdd = async (newData: DataProps) => {
    const { name, price, category_id, inventory } = newData;
    if (
      name === undefined ||
      price === undefined ||
      category_id === undefined ||
      inventory === undefined
    ) {
      setErrorMessage('Please enter all data form.');
      setIsError(true);
    } else {
      await api.post('products', newData).then(response => {
        const newList: any = [...data, response.data];
        setData(newList);
        setIsError(false);
        setErrorMessage('');
      });
    }
  };

  const handleUpdate = async (newData: DataProps, oldData: DataProps) => {
    await api
      .put(`products/${oldData.id}`, newData)
      .then(response => {
        const { id } = oldData;
        const index: number = data.findIndex(
          (item: DataProps) => item.id === id,
        );
        const dataCopy: any = [...data];
        dataCopy[index] = newData;
        setData(dataCopy);
        setIsError(false);
        setErrorMessage('');
      })
      .catch(error => {
        setErrorMessage('Update item error.');
        setIsError(true);
      });
  };

  const handleDelete = async (oldData: DataProps) => {
    await api
      .delete(`/products/${oldData.id}`)
      .then(res => {
        const dataDelete = [...data];
        const { id } = oldData;
        const index: number = data.findIndex(
          (item: DataProps) => item.id === id,
        );
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        setIsError(false);
        setErrorMessage('');
      })
      .catch(error => {
        setErrorMessage('Delete failed! Server error');
        setIsError(true);
      });
  };

  const handleData = (query: any) => {
    return new Promise((resolve, reject) => {
      let url = 'products?';
      url += `q=${query.search || ''}`;
      url += `&per_page=${query.pageSize}`;
      url += `&page=${query.page + 1}`;
      api
        .get(url)
        .then((result: AxiosResponse<any>) => {
          resolve({
            data: result.data.data,
            page: result.data.page - 1,
            totalCount: result.data.total,
          });
        })
        .catch(error => console.log(error));
    });
  };

  return (
    <>
      <Header />
      <Container>
        <Box pt={1.5} pb={4.5}>
          <Box mt={1.5} mb={1.5}>
            <Collapse in={isError}>
              <Alert severity="error" onClose={() => setIsError(false)}>
                {errorMessage}
              </Alert>
            </Collapse>
          </Box>
          <Table
            title="Products"
            columns={columns}
            data={handleData}
            onRowClick={(
              evt: EventHandlerNonNull,
              selectedRow: DataProps,
            ): void => {
              history.push(`/products/${selectedRow.id}`);
            }}
            editable={{
              onRowAdd: handleAdd,
              onRowUpdate: handleUpdate,
              onRowDelete: handleDelete,
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
