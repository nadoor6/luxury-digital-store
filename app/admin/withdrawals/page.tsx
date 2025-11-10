// app/admin/withdrawals/page.tsx - CREATE THIS FILE
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaCheck, FaTimes, FaMoneyBillWave, FaClock, FaHistory } from 'react-icons/fa';

export default function AdminWithdrawalsManagement() {
  const { 
    isAdmin, 
    getWithdrawalRequests, 
    approveWithdrawal, 
    rejectWithdrawal,
    processWithdrawal
  } = useWallet();
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'processing'>('pending');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null);
  const [adminNote, setAdminNote] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) {
      setWithdrawals(getWithdrawalRequests());
    }
  }, [isAdmin, getWithdrawalRequests]);

  if (!isAdmin) {
    router.push('/admin/access');
    return null;
  }

  const filteredWithdrawals = withdrawals.filter(withdrawal => 
    filter === 'all' ? true : withdrawal.status === filter
  );

  const handleApprove = async (withdrawalId: string) => {
    try {
      await approveWithdrawal(withdrawalId, adminNote);
      setWithdrawals(getWithdrawalRequests());
      setSelectedWithdrawal(null);
      setAdminNote('');
      alert('Withdrawal approved successfully!');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleReject = async (withdrawalId: string) => {
    if (!adminNote) {
      alert('Please provide a reason for rejection');
      return;
    }

    try {
      await rejectWithdrawal(withdrawalId, adminNote);
      setWithdrawals(getWithdrawalRequests());
      setSelectedWithdrawal(null);
      setAdminNote('');
      alert('Withdrawal rejected successfully!');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleProcess = async (withdrawalId: string) => {
    try {
      await processWithdrawal(withdrawalId, adminNote);
      setWithdrawals(getWithdrawalRequests());
      setSelectedWithdrawal(null);
      setAdminNote('');
      alert('Withdrawal marked as processing!');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'approved': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'processing': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-2xl p-8 border border-white/10"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/dashboard" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 magnetic-btn">
              <FaArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white brand-ugarit">WITHDRAWAL REQUESTS MANAGEMENT</h1>
              <p className="text-white/60 font-helvetica">Manual withdrawal processing system</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
              <FaClock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-helvetica-bold">Pending</p>
              <p className="text-2xl font-black text-white">
                {withdrawals.filter(w => w.status === 'pending').length}
              </p>
            </div>
            <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
              <FaCheck className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-helvetica-bold">Approved</p>
              <p className="text-2xl font-black text-white">
                {withdrawals.filter(w => w.status === 'approved').length}
              </p>
            </div>
            <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
              <FaTimes className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-white font-helvetica-bold">Rejected</p>
              <p className="text-2xl font-black text-white">
                {withdrawals.filter(w => w.status === 'rejected').length}
              </p>
            </div>
            <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
              <FaMoneyBillWave className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-helvetica-bold">Processing</p>
              <p className="text-2xl font-black text-white">
                {withdrawals.filter(w => w.status === 'processing').length}
              </p>
            </div>
            <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
              <FaHistory className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-helvetica-bold">Total</p>
              <p className="text-2xl font-black text-white">{withdrawals.length}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { value: 'pending', label: 'Pending', count: withdrawals.filter(w => w.status === 'pending').length },
              { value: 'processing', label: 'Processing', count: withdrawals.filter(w => w.status === 'processing').length },
              { value: 'approved', label: 'Approved', count: withdrawals.filter(w => w.status === 'approved').length },
              { value: 'rejected', label: 'Rejected', count: withdrawals.filter(w => w.status === 'rejected').length },
              { value: 'all', label: 'All', count: withdrawals.length }
            ].map((filterOption) => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value as any)}
                className={`px-4 py-2 rounded-xl font-helvetica-bold whitespace-nowrap transition-all duration-300 ${
                  filter === filterOption.value
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {filterOption.label} ({filterOption.count})
              </button>
            ))}
          </div>

          {/* Withdrawals List */}
          <div className="space-y-4">
            {filteredWithdrawals.length === 0 ? (
              <div className="text-center py-12">
                <FaMoneyBillWave className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 font-helvetica-bold">No withdrawals found</p>
                <p className="text-white/40 font-helvetica mt-2">
                  {filter === 'pending' ? 'No pending withdrawals requiring action' : `No ${filter} withdrawals`}
                </p>
              </div>
            ) : (
              filteredWithdrawals.map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="liquid-glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FaMoneyBillWave className="w-6 h-6 text-red-400" />
                      <div>
                        <p className="text-white font-helvetica-bold">
                          ${withdrawal.amount} • Withdrawal
                        </p>
                        <p className="text-white/60 font-helvetica text-sm">
                          Wallet: {withdrawal.walletAddress}
                        </p>
                        <p className="text-white/40 font-helvetica text-sm">
                          {new Date(withdrawal.createdAt).toLocaleString()}
                        </p>
                        {withdrawal.bankDetails && (
                          <p className="text-white/40 font-helvetica text-sm">
                            Bank: {withdrawal.bankDetails}
                          </p>
                        )}
                        {withdrawal.adminNote && (
                          <p className="text-white/40 font-helvetica text-sm">
                            Note: {withdrawal.adminNote}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-helvetica-bold border ${getStatusColor(withdrawal.status)}`}>
                        {withdrawal.status.toUpperCase()}
                      </span>

                      {withdrawal.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedWithdrawal({...withdrawal, action: 'approve'})}
                            className="p-2 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                            title="Approve"
                          >
                            <FaCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedWithdrawal({...withdrawal, action: 'reject'})}
                            className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                            title="Reject"
                          >
                            <FaTimes className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedWithdrawal({...withdrawal, action: 'process'})}
                            className="p-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                            title="Mark as Processing"
                          >
                            <FaClock className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Action Modal */}
        {selectedWithdrawal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="liquid-glass rounded-2xl p-6 border border-white/10 max-w-md w-full"
            >
              <h3 className="text-xl font-black text-white brand-ugarit mb-4">
                {selectedWithdrawal.action === 'approve' ? 'APPROVE WITHDRAWAL' :
                 selectedWithdrawal.action === 'reject' ? 'REJECT WITHDRAWAL' : 'MARK AS PROCESSING'}
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-white/60">Amount:</span>
                  <span className="text-white font-helvetica-bold">${selectedWithdrawal.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Wallet:</span>
                  <span className="text-white font-helvetica-bold text-sm">
                    {selectedWithdrawal.walletAddress}
                  </span>
                </div>
                {selectedWithdrawal.bankDetails && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Bank Details:</span>
                    <span className="text-white font-helvetica-bold text-sm">
                      {selectedWithdrawal.bankDetails}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-white font-helvetica-bold mb-2">
                  ADMIN NOTE
                </label>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent font-helvetica resize-none"
                  placeholder="Add note about this withdrawal..."
                />
              </div>

              <div className="flex gap-3">
                {selectedWithdrawal.action === 'approve' && (
                  <button
                    onClick={() => handleApprove(selectedWithdrawal.id)}
                    className="flex-1 py-3 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-colors font-helvetica-bold"
                  >
                    APPROVE
                  </button>
                )}
                {selectedWithdrawal.action === 'reject' && (
                  <button
                    onClick={() => handleReject(selectedWithdrawal.id)}
                    disabled={!adminNote}
                    className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors font-helvetica-bold disabled:opacity-50"
                  >
                    REJECT
                  </button>
                )}
                {selectedWithdrawal.action === 'process' && (
                  <button
                    onClick={() => handleProcess(selectedWithdrawal.id)}
                    className="flex-1 py-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-colors font-helvetica-bold"
                  >
                    MARK PROCESSING
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedWithdrawal(null);
                  setAdminNote('');
                }}
                className="w-full mt-3 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors font-helvetica-bold"
              >
                CANCEL
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}