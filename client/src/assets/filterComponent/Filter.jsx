import React, { useState, useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import EquipmentUnderPressure from '../../components/filterForms/EquipmentUnderPressure'
import PipeRolling from '../../components/filterForms/PipeRolling'
import s from '../../css/Filter.module.css'
import Header from '../header/Header'
import { companiesDataApi } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilteredInns, setFilteredCompanies, setFilteredInns } from '../../redux/filter/slice'
import { useNavigate } from 'react-router-dom'

export default function Filter({ content, searchedParam, companiesCount, isBackBtnNeeded }) {
  const [equipData, setEquipData] = useState({})
  const [buttonClicked, setButtonClicked] = useState(false);
  const filteredInns = useSelector((state) => state.filter.filteredInns)
  const searchByOccupationData = useSelector((state) => state.search.searchByOccupationData)
 const { companyOccupation, lengthArr: lengthArrOcc } = searchByOccupationData
 const filteredCompanies = useSelector((state) => state.filter.filteredCompanies)
 const navigate = useNavigate()

  const dispatch = useDispatch()

  const setHeader = () => {
    return (
      <Header
        searchedParam={searchedParam}
        companiesCount={companiesCount}
        isBackBtnNeeded={isBackBtnNeeded}
        isSearched={true}
      />
    )
  }

  const sendEquipmentData = (e) => {
    setEquipData(e)
    // console.log(`DATA::: `, e);
  }

  const handleClickSearch = () => {
    (async () => {
      await dispatch(fetchFilteredInns(equipData));
      setButtonClicked(true); // Set the state to true when the action is completed
      navigate('/filtered-companies')
    })();

    // /filtered-companies
    
  };

  useEffect(() => {
    const fn = async () => {
      let filteredCompaniesArr = [];
      if (filteredInns && filteredInns.length > 0) {
        companyOccupation.map((el) => {
          el.data.map((item) => {
            if (item.information === 'ИНН') {
              filteredInns.forEach((inn) => {
                if (item.value === inn) {
                  filteredCompaniesArr.push(el);
                  return el;
                }
              });
            }
          });
        });
  
        await dispatch(setFilteredCompanies(filteredCompaniesArr));
        console.log(filteredCompanies);
      }
    };
    fn();
  }, [buttonClicked, companyOccupation, filteredInns]);

  return (
    <Container className={s.wrapper}>
      {setHeader()}

      {content === 'Сосуды и аппараты работающие под давлением' && (
        <EquipmentUnderPressure sendEquipmentData={sendEquipmentData} />
      )}

      {content === 'Трубный прокат' && <PipeRolling />}

      <Row> &nbsp;</Row>
      <Button onClick={handleClickSearch}>Поиск</Button>
    </Container>
  )
}
