import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginationComponent = ({ categoryName, searchQuery, paginationLinksNumber, pageNum }) => {

  const category = categoryName ? `category/${categoryName}/` : "";
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const url = `/product-list/${category}${search}`;

  return (
    <Pagination>
      {/* Previous Page Link */}
      <LinkContainer to={`${url}${pageNum - 1}`}>
        <Pagination.Prev disabled={pageNum === 1} />
      </LinkContainer>

      <Pagination.Item>{1}</Pagination.Item>

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item>{14}</Pagination.Item>

      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  );
};


export default PaginationComponent;