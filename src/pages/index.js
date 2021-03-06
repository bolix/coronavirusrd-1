import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import MainInfo from '../components/main-info'
import CaseCharts from '../components/case-charts'
import ProvinceDistribution from '../components/province-distribution'
import OriginChart from '../components/origin-chart'
import SexChart from '../components/sex-chart'
import NewByDay from '../components/new-by-day'
import GrowthFactor from "../components/growth-factor"

const IndexPage = () => {

  const casesQuery = useStaticQuery(graphql`
    query allDataQuery {
      allCasesJson {
        nodes {
          cases {
            date
            total_cases
            total_deaths
            new_cases
            new_deaths
          }
        }
      }
      allSexJson {
        nodes {
          sex {
            date
            men
            women
          }
        }
      }
      allProvincesJson {
        nodes {
          provinces {
            name
            cases {
              date
              total_imported
              total_under_investigation
              total_local
              total_deaths
              total_cases
            }
          }
        }
      }
    }
  `)

  const allCases = casesQuery.allCasesJson.nodes[0].cases
  const sexData = casesQuery.allSexJson.nodes[0].sex
  const allProvinces = casesQuery.allProvincesJson.nodes[0].provinces

  console.log(allCases, sexData, allProvinces)

  return (
    <Layout>
      <SEO title="Inicio" />

      <strong>Última actualización: </strong> 22 de marzo, 3:20 PM

      <hr />

      <MainInfo cases={allCases} />
      
      <hr />

      <CaseCharts cases={allCases} />

      <hr />

      <ProvinceDistribution provinces={allProvinces} />

      <hr />

      <OriginChart provinces={allProvinces} />

      <hr />

      <SexChart sexData={sexData} />

      <hr />

      <NewByDay cases={allCases} />

      <hr />

      <GrowthFactor cases={allCases} />
      
    </Layout>
  )
}

export default IndexPage
