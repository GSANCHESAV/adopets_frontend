/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Collapse,
  Typography,
  Grid,
  Divider,
  Avatar,
  Chip,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
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

const Product: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<DataProps>({} as DataProps);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    api
      .get(`products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        setErrorMessage('Load product error');
        setIsError(true);
      });
  }, [id]);

  return (
    <>
      <Header />
      <Box mt={1.5} mb={1.5}>
        <Collapse in={isError}>
          <Alert severity="error" onClose={() => setIsError(false)}>
            {errorMessage}
          </Alert>
        </Collapse>
      </Box>
      <Container>
        <Box pt={1.5} pb={4.5}>
          <Grid container spacing={5} justify="flex-start" alignItems="center">
            <Avatar
              alt="Dog food"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4TjvWtNrU7r4OuRkwLexXrh-o5sJsriMd5g&usqp=CAU"
              variant="rounded"
              style={{
                width: '100%',
                height: '100%',
                maxWidth: 400,
                maxHeight: 400,
                fontSize: 44,
                paddingLeft: 24,
                paddingRight: 24,
              }}
            >
              {product.name &&
                `${product.name[0]}${product.name[1].toUpperCase()}`}
            </Avatar>
            <Grid item xs>
              <Grid container spacing={3}>
                <Grid item xs>
                  <Box mb={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                      {product && product.name}
                    </Typography>
                    <Chip
                      color="secondary"
                      label={product.category ? product.category.name : ''}
                    />
                  </Box>
                  <Grid item>
                    <Typography variant="h5" component="h3">
                      Product ID
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {product && `${product.id}`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h3">
                      Inventory
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {product && `${product.inventory} unid.`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h3">
                      Price
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {product && `$ ${product.price}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        <Box mt={3} mb={9}>
          <Typography variant="h5" component="h3" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1">
            {product && product.description}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Product;
