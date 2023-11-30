'use client'
import React from 'react'
import { Typography, styled, Theme } from '@mui/material'
import { dFlexSpaceBetween, dFlexCenter } from '../../../Theme/UtilityStyles'
import { v4 as uuidv4 } from 'uuid'
import { colors } from '../../../Theme/Theme'

interface TodaysSummaryProps {
  data: { title: string; desc: string }[]
}

const StatisticsWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  ...dFlexSpaceBetween,
  padding: `${theme.spacing(2)} 0`,
  borderTop: `1px solid ${colors.grey}`,
  borderBottom: `1px solid ${colors.grey}`,
  div: {
    ...dFlexCenter,
    flexDirection: 'column'
  }
}))

const TodaysSummary: React.FC<TodaysSummaryProps> = ({ data }) => {
  return (
    <>
      <StatisticsWrapper>
        {data.map((item) => (
          <div key={uuidv4()}>
            <Typography variant="h3" sx={{ mb: 0 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 12, mb: 0 }}>
              {item.desc}
            </Typography>
          </div>
        ))}
      </StatisticsWrapper>
    </>
  )
}

export default TodaysSummary
