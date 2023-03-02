import { createClient } from '@supabase/supabase-js'
import { gql } from '@apollo/client'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/** タスク一覧取得用クエリー */
export const tasksQuery = gql(`
    query TasksQuery($orderBy: [tasksOrderBy!]) {
        tasksCollection(orderBy: $orderBy) {
            edges {
            node {
                title
                is_completed
                id
            }
            }
        }
    }
`)

/** 新規タスク作成用ミューテーション */
export const taskInsert = gql(`
    mutation TaskMutation($objects: [tasksInsertInput!]!) {
        insertIntotasksCollection(objects: $objects) {
            records {
            title
            }
        }
    }
`)

/** タスクのステータス更新用ミューテーション */
export const taskUpdate = gql(`
    mutation Mutation($set: tasksUpdateInput!, $filter: tasksFilter) {
        updatetasksCollection(set: $set, filter: $filter) {
            records {
                is_completed
            }
        }
    }
`)
