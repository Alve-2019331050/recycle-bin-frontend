/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import Layout from "../components/Layout";

function index() {
  return (
    <>
      <Layout>
        <Link href="/sell">Sell a product</Link>
      </Layout>
    </>
  );
}

export default index;