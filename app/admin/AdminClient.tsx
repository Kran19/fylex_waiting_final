"use client"

import React, { useState } from 'react'
import { deleteEntry } from './actions'

export function AdminClient({ entries }: { entries: any[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const exportToCsv = () => {
    const headers = ['ID', 'Phone Number', 'Date Registered']
    const rows = entries.map(e => [
      e.id, 
      e.phone, 
      new Date(e.created_at).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }).replace(/,/g, '')
    ])
    const csvContent = "data:text/csv;charset=utf-8," 
        + [headers.join(","), ...rows.map(e => e.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "fylex_waitlist.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    setIsDeleting(id)
    await deleteEntry(id)
    setIsDeleting(null)
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={exportToCsv}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Export to Excel (CSV)
        </button>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/50">
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Date Registered
                </th>
                <th className="px-6 py-4 text-xs font-medium text-neutral-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {entries.map((entry: any) => (
                <tr key={entry.id} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                    #{entry.id.substring(entry.id.length - 6)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {entry.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                    {new Date(entry.created_at).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      timeZone: 'Asia/Kolkata'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      disabled={isDeleting === entry.id}
                      className="text-red-400 hover:text-red-300 text-xs font-medium px-3 py-1 rounded bg-red-400/10 hover:bg-red-400/20 transition-colors disabled:opacity-50"
                    >
                      {isDeleting === entry.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
              
              {entries.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-neutral-500 text-sm">
                    No signups yet. Once users join the waitlist, they will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
