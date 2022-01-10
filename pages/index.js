import Image from "next/image";
import Link from "next/link";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { fetchApi, baseUrl } from "../utils/fetchApi";
import Property from "../components/Property.jsx";
const Banner = ({
  purpose,
  imageUrl,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
}) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='5'>
    <Image src={imageUrl} width={500} height={300} alt='banner' />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>
        {purpose}
      </Text>
      <Text fontSize='3xl' fontWeight='bold'>
        {title1} <br />
        {title2}
      </Text>
      <Text color='gray.700' fontSize='lg' paddingTop='3' paddingBottom='3'>
        {desc1} <br />
        {desc2}
      </Text>
      <Button fontSize='xl'>
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);
export default function Home({ propertiesForSale, propertiesForRent }) {
 
 

  return (
    <Box>
      <Banner
        purpose='RENT A HOME'
        title1='Rental Homes for'
        title2='everyone'
        desc1='Explore Apartments ,Homes,Villas'
        desc2='and more'
        buttonText='Explore Renting Options'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap='wrap' >
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose='BUY A HOME'
        title1='Buy and Own '
        title2='Your Dream Home'
        desc1='Explore Apartments ,Homes,Villas'
        desc2='and more'
        buttonText='Explore Buying Options'
        linkName='/search?purpose=for-buy'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />
      <Flex flexWrap='wrap'>
        {propertiesForSale?.map((property)=>(
          <Property property={property} key={property.id}/>
        ))}
      </Flex>
    </Box>
  );
}
export async function getStaticProps() {
  let propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  let propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForRent: propertyForRent?.hits,
      propertiesForSale: propertyForSale?.hits,
    },
  };
}
